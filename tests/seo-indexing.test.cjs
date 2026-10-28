const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('search crawlers can read the noindex directive on consultation pages', () => {
  const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
  assert.match(robots, /User-agent:\s*\*[\s\S]*?Allow:\s*\/\s*(?:\n|$)/i);
  assert.doesNotMatch(robots, /^\s*Disallow:\s*\/\s*$/im);

  for (const page of ['index', 'knee', 'back', 'cervical', 'live_index', 'privacy', 'terms', 'thank-you']) {
    const html = fs.readFileSync(path.join(root, `${page}.html`), 'utf8');
    assert.match(html, /<meta\s+name="robots"\s+content="noindex, follow">/i, `${page}.html must be noindex`);
  }
});
