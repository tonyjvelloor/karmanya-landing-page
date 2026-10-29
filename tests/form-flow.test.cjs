const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const settle = () => new Promise(resolve => setImmediate(resolve));

test('condition URLs navigate normally and preserve case-sensitive click identifiers and anchors', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const router = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const [condition, expected] of [['SCIATICA', 'back'], ['spine', 'back'], ['neck', 'cervical'], ['knee', '']]) {
    const search = '?condition=' + condition + '&gclid=CaseSensitiveClickID';
    let target = '';
    vm.runInNewContext(router, { URLSearchParams, location: { search, hash: '#book', replace: value => { target = value; } } });
    assert.equal(target, expected ? '/' + expected + '.html' + search + '#book' : '');
  }
  assert.equal(router.includes('document.write'), false);
  assert.equal(router.includes('window.stop'), false);
});

function harness(filename, send, isProd = true) {
  const html = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
  const block = html.split('/* ---------- Booking form ---------- */')[1].split('/* ---------- Sticky bar')[0];
  const tracking = html.match(/  function trackLead\(id, method\) \{[\s\S]*?\n  \}/)[0];
  let submit;
  const element = (value = '') => ({ value, hidden: true, disabled: false, textContent: '', innerHTML: '', setAttribute() {}, removeAttribute() {}, focus() {}, scrollIntoView() {} });
  const els = Object.fromEntries(['leadForm', 'fullName', 'phone', 'nameError', 'phoneError', 'sendError', 'submitBtn', 'formWrap', 'doneWrap', 'doneTitle', 'donePhone', 'doneWa', 'donePreference'].map(id => [id, element()]));
  els.fullName.value = 'Example Test'; els.phone.value = '+91 90000 00000';
  els.formWrap.hidden = false;
  els.leadForm.addEventListener = (name, fn) => { submit = fn; };
  els.leadForm.querySelector = selector => ({ value: selector === '[name=website]' ? '' : 'Self' });
  const calls = [], payloads = [], metaCalls = [];
  const window = { KarmanyaBooking: { newLeadId: () => 'consult-00000000-0000-4000-8000-000000000001', send: payload => { payloads.push(payload); return send(payload); } } };
  const context = { window, FormData, Promise, Date, Math, Object, JSON, location: { origin: 'https://consult.karmanyaayurveda.com', pathname: '/' + filename }, document: { getElementById: id => els[id] },
    sel: { value: 'Flexible', selectedIndex: 0, options: [{ textContent: 'First available slot' }] }, symptomsField: { value: '' }, KA: { isProd, angle: 'default', params: {} }, C: { sendFormOutsideProduction: false, thankYouUrl: '', adsId: 'AW-18375933203', adsLeadLabel: '91coCMuK5uscEJP6qbpE', ga4Id: 'G-QWH0NSNLVE', metaPixelId: '2147354382501419' }, leadTracked: {}, wa: text => 'https://wa.me/919819820017?text=' + encodeURIComponent(text), gtag: (...args) => calls.push(args), fbq: (...args) => metaCalls.push(args) };
  vm.runInNewContext(tracking + '\n' + block, context);
  return { html, els, calls, metaCalls, payloads, slot: context.sel, submit: () => submit({ preventDefault() {} }) };
}

for (const filename of ['index.html', 'knee.html', 'back.html', 'cervical.html']) {
  test(filename + ': visit readiness reaches the clinic and confirmation without entering the Ads event', async () => {
    const h = harness(filename, async () => ({ ok: true }));
    h.slot.value = 'Within a week'; h.slot.options[0].textContent = 'This week';
    h.submit(); await settle();
    assert.equal(h.payloads[0].timeslot, 'Within a week');
    assert.equal(h.els.donePreference.textContent, 'This week');
    const conversion = h.calls.find(args => args[1] === 'conversion')[2];
    assert.deepEqual(Object.keys(conversion).sort(), ['send_to', 'transaction_id']);
  });
}

for (const filename of ['index.html', 'knee.html', 'back.html', 'cervical.html']) {
  test(filename + ': acknowledgement precedes success, prevents double submit, emits one anonymous Ads event', async () => {
    let acknowledge;
    const h = harness(filename, () => new Promise(resolve => { acknowledge = resolve; }));
    h.submit(); h.submit();
    assert.equal(h.payloads.length, 1);
    assert.match(h.payloads[0].lead_id, /^consult-/);
    assert.equal(h.calls.length, 0); assert.equal(h.metaCalls.length, 0);
    assert.equal(h.els.doneWrap.hidden, true);
    acknowledge({ ok: true }); await settle();
    assert.equal(h.els.doneWrap.hidden, false);
    const conversions = h.calls.filter(args => args[1] === 'conversion');
    assert.equal(conversions.length, 1);
    assert.equal(h.metaCalls.length, 1);
    assert.deepEqual(JSON.parse(JSON.stringify(h.metaCalls[0])), ['trackSingle', '2147354382501419', 'Lead', {}, { eventID: h.payloads[0].lead_id }]);
    assert.deepEqual(Object.keys(conversions[0][2]).sort(), ['send_to', 'transaction_id']);
    assert.equal(h.html.includes('data-lead-id='), false);
    assert.equal(h.html.includes("mode: 'no-cors'"), false);
    assert.equal(h.html.includes('window.location.href = wa(text)'), false);
  });
  test(filename + ': failed requests remain retryable with the same ID and no primary conversion', async () => {
    const h = harness(filename, async () => { throw new Error('unconfirmed'); });
    h.submit(); await settle();
    assert.equal(h.calls.length, 0); assert.equal(h.metaCalls.length, 0);
    assert.equal(h.els.doneWrap.hidden, true);
    assert.equal(h.els.submitBtn.disabled, false);
    assert.equal(h.els.sendError.hidden, false);
    h.submit(); await settle();
    assert.equal(h.payloads[0].lead_id, h.payloads[1].lead_id);
  });
  test(filename + ': preview and invalid forms never submit or count a lead', async () => {
    const h = harness(filename, async () => { throw new Error('must not send'); }, false);
    h.submit(); await settle();
    assert.equal(h.payloads.length, 0); assert.equal(h.calls.length, 0); assert.equal(h.metaCalls.length, 0);
    h.els.phone.value = '123'; h.submit(); await settle();
    assert.equal(h.payloads.length, 0); assert.equal(h.calls.length, 0); assert.equal(h.metaCalls.length, 0);
  });
}
