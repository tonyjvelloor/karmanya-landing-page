const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const script = fs.readFileSync(require('node:path').join(__dirname, '..', 'consultation-flow.js'), 'utf8');

test('third-party video frames are created only after an explicit play action', () => {
  let play;
  const frames = [], replacements = [];
  const button = { getAttribute: key => key === 'data-video-id' ? 'DNzYOICUJW7' : 'Play patient video', addEventListener: (event, fn) => { assert.equal(event, 'click'); play = fn; }, parentNode: { replaceChild: (...args) => replacements.push(args) } };
  vm.runInNewContext(script, {
    document: { querySelectorAll: () => [button], getElementById: () => null, createElement: tag => { assert.equal(tag, 'iframe'); const frame = { setAttribute() {} }; frames.push(frame); return frame; } },
    window: { addEventListener() {} }, location: { hash: '' },
  });
  assert.equal(frames.length, 0);
  play();
  assert.equal(frames.length, 1);
  assert.equal(frames[0].src, 'https://www.instagram.com/reel/DNzYOICUJW7/embed/');
  assert.equal(replacements.length, 1);
});

test('existing deep links reveal their containing educational details', () => {
  const outer = { open: false, parentElement: { closest: () => null } };
  const inner = { open: false, parentElement: { closest: () => outer } };
  vm.runInNewContext(script, { document: { querySelectorAll: () => [], getElementById: id => { assert.equal(id, 'whole-person-care'); return { closest: () => inner }; } }, window: { addEventListener() {} }, location: { hash: '#whole-person-care' } });
  assert.equal(inner.open, true);
  assert.equal(outer.open, true);
});
