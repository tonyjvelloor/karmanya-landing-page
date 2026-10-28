const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const script = fs.readFileSync(require('node:path').join(__dirname, '..', 'consultation-flow.js'), 'utf8');

for (const filename of ['index.html', 'knee.html', 'back.html']) {
  test(filename + ': all three original testimonials are visible in order, with Malayalam last and no autoplay', () => {
    const html = fs.readFileSync(require('node:path').join(__dirname, '..', filename), 'utf8');
    const section = html.match(/<div class="flow-testimonials"[\s\S]*?(?=<!-- FIT -->)/)[0];
    const frames = [...section.matchAll(/<iframe\b[^>]+>/g)].map(m => m[0]);
    assert.equal(frames.length, 3);
    for (const [index, id] of ['DHFwJAGtggY', 'DFFbgpbt85n', 'DNzYOICUJW7'].entries()) {
      assert.ok(frames[index].includes('https://www.instagram.com/reel/' + id + '/embed/'));
      assert.ok(frames[index].includes('loading="lazy"'));
      assert.ok(!frames[index].includes('autoplay'));
    }
    assert.equal((section.match(/flow-video-featured/g) || []).length, 2);
    assert.ok(!section.includes('<details'));
    assert.ok(section.includes('in Malayalam'));
  });
}

test('existing deep links reveal their containing educational details', () => {
  const outer = { open: false, parentElement: { closest: () => null } };
  const inner = { open: false, parentElement: { closest: () => outer } };
  vm.runInNewContext(script, { document: { querySelectorAll: () => [], getElementById: id => { assert.equal(id, 'whole-person-care'); return { closest: () => inner }; } }, window: { addEventListener() {} }, location: { hash: '#whole-person-care' } });
  assert.equal(inner.open, true);
  assert.equal(outer.open, true);
});
