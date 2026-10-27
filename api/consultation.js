// Same-origin bridge to the clinic's existing Google Apps Script booking service.
// Never log request bodies or return patient details to advertising code.
const DEFAULT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzhvbwKqfnAwPSDmRl-8stVBW1IOyHC1-i4cpOHckCUTdEg2FL6em6i8ESgc-4IQO_Y/exec';
const ALLOWED_ORIGINS = new Set([
  'https://karmanyaayurveda.com',
  'https://www.karmanyaayurveda.com',
  'https://consult.karmanyaayurveda.com',
]);

function cleanPhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return digits;
}

function positiveAcknowledgement(body, leadId) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || body.error || body.errors) return false;
  if (body.success === false || body.ok === false) return false;
  if (body.status === 'error' || body.result === 'error') return false;
  const echoedId = body.lead_id || body.leadId || body.eventId;
  if (echoedId && echoedId !== leadId) return false;
  return body.ok === true || body.success === true || body.status === 'success' || body.result === 'success';
}

function safeCell(value) {
  // Prevent names or other text being interpreted as spreadsheet formulas.
  return /^[=+@\-\t\r]/.test(value) ? "'" + value : value;
}

async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }
  if (!ALLOWED_ORIGINS.has(req.headers.origin) || process.env.VERCEL_ENV === 'preview') {
    return res.status(403).json({ ok: false });
  }
  if (!(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
    return res.status(415).json({ ok: false });
  }
  let input;
  try {
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (!raw || Buffer.byteLength(raw) > 8192) return res.status(413).json({ ok: false });
    input = JSON.parse(raw);
  } catch (_) {
    return res.status(400).json({ ok: false });
  }
  if (!input || typeof input !== 'object' || Array.isArray(input) || input.website) {
    return res.status(400).json({ ok: false });
  }
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const phone = cleanPhone(input.phone);
  const leadId = String(input.lead_id || '');
  if (name.length < 2 || name.length > 120 || !/^[6-9]\d{9}$/.test(phone) || !/^consult-[a-zA-Z0-9-]{8,80}$/.test(leadId)) {
    return res.status(400).json({ ok: false });
  }
  const fields = { name: safeCell(name), phone, lead_id: leadId, eventId: leadId };
  const limits = { concern: 120, timeslot: 160, patient_for: 40, symptoms: 500, angle: 40,
    utm_source: 200, utm_medium: 200, utm_campaign: 200, utm_content: 200, utm_term: 200,
    gclid: 300, gbraid: 300, wbraid: 300, fbclid: 300 };
  for (const [key, limit] of Object.entries(limits)) {
    if (input[key] == null) continue;
    if (typeof input[key] !== 'string' || input[key].length > limit) return res.status(400).json({ ok: false });
    fields[key] = safeCell(input[key]);
  }
  if (input.page) {
    try {
      const page = new URL(input.page);
      if (!ALLOWED_ORIGINS.has(page.origin)) return res.status(400).json({ ok: false });
      fields.page = page.origin + page.pathname; // Never forward private query strings.
    } catch (_) { return res.status(400).json({ ok: false }); }
  }
  const endpoint = process.env.BOOKING_APPS_SCRIPT_URL || DEFAULT_ENDPOINT;
  try {
    const target = new URL(endpoint);
    if (target.protocol !== 'https:' || target.hostname !== 'script.google.com' || !/^\/macros\/s\/[^/]+\/exec$/.test(target.pathname)) {
      return res.status(503).json({ ok: false });
    }
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(fields).toString(),
      signal: AbortSignal.timeout(30000),
      redirect: 'follow',
    });
    if (!upstream.ok) return res.status(502).json({ ok: false });
    const acknowledgement = await upstream.json();
    if (!positiveAcknowledgement(acknowledgement, leadId)) return res.status(502).json({ ok: false });
    return res.status(200).json({ ok: true, leadId });
  } catch (_) {
    // A timeout/error is unconfirmed, even if the remote service may have accepted it.
    return res.status(502).json({ ok: false });
  }
}

module.exports = handler;
module.exports.positiveAcknowledgement = positiveAcknowledgement;
