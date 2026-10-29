const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
for (const page of ['index', 'knee', 'back', 'cervical']) {
  const html = fs.readFileSync(`${__dirname}/../${page}.html`, 'utf8');
  const helper = html.match(/  function trackContact\(channel, loc\) \{[\s\S]*?\n  \}/)[0];
  const config = { metaPixelId: '2147354382501419', ga4Id: 'GA', adsId: 'AW', adsCallLabel: 'call', adsWhatsappLabel: 'wa' };
  test(`${page}: contact is intent, without medical details; trackers fail independently`, () => {
    for (const broken of ['', 'meta', 'google', 'other']) {
      const meta = [], google = [];
      const ctx = { C: config, KA: { isProd: true }, window: { oaiq() { if (broken === 'other') throw Error(); } }, fbq(...a) { if (broken === 'meta') throw Error(); meta.push(a); }, gtag(...a) { if (broken === 'google') throw Error(); google.push(a); } };
      vm.runInNewContext(helper, ctx);
      ctx.trackContact('call', 'hero');
      if (broken !== 'meta') assert.deepEqual(JSON.parse(JSON.stringify(meta)), [['trackSingle', config.metaPixelId, 'Contact', { channel: 'call' }]]);
      if (broken !== 'google') assert.equal(google[0][1], 'call_click');
    }
  });
  test(`${page}: fallback WhatsApp uses WhatsApp action and preview emits nothing`, () => {
    const calls = [];
    const ctx = { C: config, KA: { isProd: true }, window: {}, fbq(...a) { calls.push(a); }, gtag(...a) { calls.push(a); } };
    vm.runInNewContext(helper, ctx);
    ctx.trackContact('whatsapp_fallback', 'form_error');
    assert.equal(calls[0][3].channel, 'whatsapp');
    assert.equal(calls[1][1], 'whatsapp_click');
    assert.equal(calls[2][2].send_to, 'AW/wa');
    calls.length = 0;
    ctx.KA.isProd = false;
    ctx.trackContact('call', 'hero');
    assert.equal(calls.length, 0);
  });
}
