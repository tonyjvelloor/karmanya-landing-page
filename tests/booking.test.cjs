const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const handler = require('../api/consultation.js');
const repo = path.resolve(__dirname, '..');
const senderPath = fs.existsSync(path.join(repo, 'public/js/booking-delivery.js'))
  ? path.join(repo, 'public/js/booking-delivery.js') : path.join(repo, 'booking-delivery.js');
const sender = fs.readFileSync(senderPath, 'utf8');
const leadId = 'consult-00000000-0000-4000-8000-000000000001';
const fixture = { name: 'Example Test', phone: '+91 90000 00000', concern: 'other', timeslot: 'Flexible', lead_id: leadId };
let fetchCalls;
const originalFetch = global.fetch;
test.beforeEach(() => {
  fetchCalls = [];
  global.fetch = async (...args) => {
    fetchCalls.push(args);
    return { ok: true, json: async () => ({ result: 'success', lead_id: leadId }) };
  };
});
test.after(() => { global.fetch = originalFetch; });

async function request(overrides = {}) {
  const req = { method: 'POST', headers: { origin: 'https://karmanyaayurveda.com', 'content-type': 'application/json' }, body: fixture, ...overrides };
  const res = { headers: {}, statusCode: 200, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.statusCode = code; return this; }, json(body) { this.body = body; return this; } };
  await handler(req, res);
  return res;
}

test('accepted booking is forwarded once and response contains no patient details', async () => {
  const res = await request();
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true, leadId });
  assert.equal(fetchCalls.length, 1);
  const payload = new URLSearchParams(fetchCalls[0][1].body);
  assert.equal(payload.get('phone'), '9000000000');
  assert.equal(payload.get('name'), fixture.name);
  assert.equal(payload.get('lead_id'), leadId);
  assert.equal(res.headers['Cache-Control'], 'no-store');
});

test('failed, ambiguous and mismatched upstream responses never become successful leads', async () => {
  for (const body of [{}, { ok: false }, { result: 'error' }, { success: true, error: 'write failed' }, { status: 'success', lead_id: 'another-request' }]) {
    global.fetch = async () => ({ ok: true, json: async () => body });
    assert.equal((await request()).statusCode, 502);
  }
  global.fetch = async () => ({ ok: true, json: async () => { throw new SyntaxError('HTML error page'); } });
  assert.equal((await request()).statusCode, 502);
  global.fetch = async () => ({ ok: false, status: 500 });
  assert.equal((await request()).statusCode, 502);
  global.fetch = async () => { throw new Error('timeout'); };
  assert.equal((await request()).statusCode, 502);
});

test('validation rejects invalid phone, invalid ID, honeypot, large bodies and foreign origins without sending', async () => {
  for (const body of [{ ...fixture, phone: '123' }, { ...fixture, lead_id: '' }, { ...fixture, website: 'bot' }, { ...fixture, name: 'A'.repeat(9000) }, null, []]) {
    assert.ok((await request({ body })).statusCode >= 400);
  }
  assert.equal((await request({ headers: { origin: 'https://example.com', 'content-type': 'application/json' } })).statusCode, 403);
  assert.equal((await request({ method: 'GET' })).statusCode, 405);
  assert.equal((await request({ headers: { origin: 'https://karmanyaayurveda.com' } })).statusCode, 415);
  assert.equal(fetchCalls.length, 0);
});

test('preview deployments cannot write to the production clinic sheet', async () => {
  const old = process.env.VERCEL_ENV;
  process.env.VERCEL_ENV = 'preview';
  try { assert.equal((await request()).statusCode, 403); assert.equal(fetchCalls.length, 0); }
  finally { if (old === undefined) delete process.env.VERCEL_ENV; else process.env.VERCEL_ENV = old; }
});

test('private query strings are stripped and spreadsheet formula text is escaped', async () => {
  await request({ body: { ...fixture, name: '=EXAMPLE()', page: 'https://karmanyaayurveda.com/book-consultation/?private=do-not-forward', ignored: 'not-sent' } });
  const payload = new URLSearchParams(fetchCalls[0][1].body);
  assert.equal(payload.get('name'), "'=EXAMPLE()");
  assert.equal(payload.get('page'), 'https://karmanyaayurveda.com/book-consultation/');
  assert.equal(payload.has('ignored'), false);
});

test('browser sender only resolves for an explicit acknowledgement of the same request', async () => {
  for (const response of [
    { ok: false, json: async () => ({ ok: true, leadId }) },
    { ok: true, json: async () => ({ ok: true, leadId: 'wrong' }) },
    { ok: true, json: async () => ({ ok: false, leadId }) },
    { ok: true, json: async () => { throw new SyntaxError('invalid JSON'); } },
  ]) {
    const window = { fetch: async () => response };
    vm.runInNewContext(sender, { window, AbortController, setTimeout, clearTimeout });
    await assert.rejects(window.KarmanyaBooking.send(fixture));
  }
  const window = { fetch: async (url, options) => {
    assert.equal(url, '/api/consultation');
    assert.equal(options.method, 'POST');
    assert.equal(options.mode, undefined);
    return { ok: true, json: async () => ({ ok: true, leadId }) };
  } };
  vm.runInNewContext(sender, { window, AbortController, setTimeout, clearTimeout });
  assert.equal((await window.KarmanyaBooking.send(fixture)).leadId, leadId);
});

if (fs.existsSync(path.join(repo, 'public/js/consultation-form.js'))) {
  const formCode = fs.readFileSync(path.join(repo, 'public/js/consultation-form.js'), 'utf8');
  function mainForm(send, hostname = 'karmanyaayurveda.com') {
    const element = (value = '') => ({ value, hidden: true, textContent: '', disabled: false, attrs: {}, setCustomValidity(v) { this.validity = v; }, setAttribute(k, v) { this.attrs[k] = v; }, focus() {} });
    const button = element();
    const els = { name: element(fixture.name), phone: element('9000000000'), concern: element('other'), timeslot: element('Flexible'), bookingWebsite: element(), bookingStatus: element(), bookingForm: { hidden: false, reportValidity: () => true, querySelector: () => button } };
    const calls = [];
    const window = { KarmanyaBooking: { cleanPhone: x => x, newLeadId: () => leadId, send }, gtag: (...args) => calls.push(args) };
    vm.runInNewContext(formCode, { window, document: { getElementById: id => els[id] }, location: { hostname, origin: 'https://' + hostname, pathname: '/book-consultation/' } });
    return { submit: () => window.handleBooking({ preventDefault() {} }), els, calls, button };
  }
  test('main site shows success and fires one anonymous conversion only after acknowledgement', async () => {
    let acknowledge;
    const form = mainForm(() => new Promise(resolve => { acknowledge = resolve; }));
    const pending = form.submit();
    assert.equal(form.calls.length, 0);
    assert.equal(form.els.bookingForm.hidden, false);
    await form.submit(); // Double click does not submit again.
    acknowledge({ ok: true, leadId });
    await pending;
    assert.equal(form.els.bookingForm.hidden, true);
    assert.match(form.els.bookingStatus.textContent, /has been received/);
    assert.equal(form.calls.length, 1);
    assert.deepEqual(Object.keys(form.calls[0][2]).sort(), ['send_to', 'transaction_id']);
    await form.submit();
    assert.equal(form.calls.length, 1);
  });
  test('main site retains a retryable form and counts no conversion on failure', async () => {
    const ids = [];
    const form = mainForm(async payload => { ids.push(payload.lead_id); throw new Error('unconfirmed'); });
    await form.submit(); await form.submit();
    assert.equal(form.calls.length, 0);
    assert.equal(form.els.bookingForm.hidden, false);
    assert.equal(form.button.disabled, false);
    assert.match(form.els.bookingStatus.textContent, /could not confirm receipt/);
    assert.equal(ids[0], ids[1]);
  });
  test('main site previews never submit or count a lead', async () => {
    let sent = false;
    const form = mainForm(async () => { sent = true; }, 'preview.vercel.app');
    await form.submit();
    assert.equal(sent, false); assert.equal(form.calls.length, 0);
    assert.match(form.els.bookingStatus.textContent, /Preview only/);
  });
}
