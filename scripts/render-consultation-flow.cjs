const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function elementAt(html, start, tag) {
  if (start < 0) throw new Error('Missing ' + tag + ' source');
  const tags = new RegExp('<' + tag + '\\b[^>]*>|</' + tag + '>', 'g');
  tags.lastIndex = start;
  let depth = 0, match;
  while ((match = tags.exec(html))) {
    depth += match[0].startsWith('</') ? -1 : 1;
    if (!depth) return html.slice(start, tags.lastIndex);
  }
  throw new Error('Unbalanced ' + tag + ' source');
}

function sectionAfter(html, marker) {
  const start = html.indexOf(marker);
  if (start < 0) throw new Error('Missing ' + marker);
  return elementAt(html, html.indexOf('<section', start), 'section');
}

function renderFlow(html, kind) {
  const knee = kind === 'knee';
  const part = knee ? 'knee' : 'back and spine';
  const formPart = knee ? 'knee' : 'spine';
  const video = knee ? 'DNzYOICUJW7' : 'DFFbgpbt85n';
  let form = elementAt(html, html.indexOf('<div class="card-form" id="book">'), 'div');
  form = form.replace(/<p class="flow-form-note">[\s\S]*?<\/p>/g, '')
    .replace(/<p class="flow-preference">[\s\S]*?<\/p>/g, '')
    .replace(/<p><a href="https:\/\/maps.google.com\/\?cid=3077549578320836260"[^>]*>Directions to the Pimple Saudagar clinic<\/a><\/p>/g, '');
  form = form.replace(/<h2>[^<]*<\/h2>/, `<h2>Request your ${formPart} consultation</h2>`)
    .replace(/<p class="form-sub">[\s\S]*?<\/p>/, '<p class="form-sub">₹500 · About 45 minutes · Pay at the clinic</p><p class="flow-form-note">The clinic will call during opening hours to confirm availability and your appointment time.</p>')
    .replace('When would you like to visit?', 'How soon would you like to visit?')
    .replace(/id="slot" name="timeslot"(?: aria-describedby="slotHint")?/, 'id="slot" name="timeslot" aria-describedby="slotHint"')
    .replace(/<option value="Flexible \/ First Available Slot">[^<]*<\/option>/, '<option value="Not specified / Please call">Choose a preference (optional)</option>')
    .replace(/<\/select>\s*<\/div>/, '</select><p class="hint" id="slotHint">Your preference helps us arrange a call; an exact slot is confirmed by the clinic.</p></div>')
    .replace(/(<button[^>]*id="submitBtn"[^>]*>)[^<]*(<\/button>)/, '$1Request a ₹500 consultation$2')
    .replace(/<p class="form-foot">[\s\S]*?<\/p>/, '<p class="form-foot">No payment online. Your number is used to arrange your visit. Questions first? <a data-wa data-loc="form" href="https://wa.me/919819820017">Ask on WhatsApp</a>.</p>')
    .replace(/(<h2 id="doneTitle">[\s\S]*?<\/h2>)\s*(<p>[\s\S]*?<\/p>)/, '$1<p>The clinic will call you on <strong id="donePhone"></strong> during opening hours. Your appointment is confirmed when the clinic agrees a time with you.</p><p class="flow-preference">Visit preference: <strong id="donePreference">To be discussed</strong></p><p><a href="https://maps.google.com/?cid=3077549578320836260" target="_blank" rel="noopener">Directions to the Pimple Saudagar clinic</a></p>')
    .replace('Get a faster confirmation on WhatsApp', 'Optional: ask the clinic on WhatsApp');
  const checkId = knee ? 'knee-check' : 'spine-check';
  const check = elementAt(html, html.indexOf(`<section class="section paper" id="${checkId}">`), 'section');
  const fit = sectionAfter(html, '<!-- FIT -->');
  const faq = sectionAfter(html, '<!-- FAQ -->');
  const care = html.match(/<!-- KARMANYA CARE START -->[\s\S]*?<!-- KARMANYA CARE END -->/)[0];
  const visit = sectionAfter(html, '<!-- VISIT -->');
  const sub = knee
    ? 'Discuss knee pain, stiffness or difficulty walking with our expert doctor. Authentic Kerala Ayurveda therapies are considered after your assessment.'
    : 'Discuss back pain, sciatica or difficulty sitting and walking with our expert doctor. Authentic Kerala Ayurveda therapies are considered after your assessment.';
  const main = `<main id="top">
<!-- CONSULTATION FLOW START -->
<section class="hero flow-hero">
  <div class="wrap flow-hero-grid">
    <div class="hero-copy">
      <p class="kicker">In-clinic care · Pimple Saudagar, Pune</p>
      <h1 id="heroTitle">${knee ? 'Ayurvedic knee-pain care in Pimple Saudagar' : 'Ayurvedic back-pain & sciatica care'}</h1>
      <p class="sub" id="heroSub">${esc(sub)}</p>
      <script>(function(){var a=window.KA_ANGLES[window.KA.angle];if(window.KA.angle!=='default'){document.getElementById('heroTitle').textContent=a.title;document.getElementById('heroSub').textContent=a.sub;}})();</script>
      <p class="flow-fee"><strong>₹500 in-clinic consultation</strong><span>About 45 minutes · Pay at the clinic</span></p>
      <div class="cta-row" id="heroCtas"><a class="btn btn-primary" href="#book">Request a ₹500 consultation</a><a class="flow-question" href="tel:+919819820017" data-loc="hero_text">Questions? Call the clinic</a></div>
      <p class="flow-confirm">Your appointment time is confirmed by the clinic.</p>
      <ul class="flow-inclusions" aria-label="Your consultation includes">
        <li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><span>Discuss symptoms, medical history and existing reports</span></li>
        <li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><span>An individual ${formPart} examination with our expert doctor</span></li>
        <li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg><span>Understand suitable care options and your next steps</span></li>
      </ul>
      <p class="flow-cost-note">Therapy and medicines are charged separately, if recommended. Costs are explained before you decide to proceed.</p>
      <div class="flow-trust-strip"><span>Open daily · 10 AM–8 PM</span><a href="https://maps.google.com/?cid=3077549578320836260" target="_blank" rel="noopener">Read reviews &amp; see our location ↗</a></div>
    </div>
    <!-- BOOKING FORM START -->
    ${form}
    <!-- BOOKING FORM END -->
  </div>
</section>

<section class="section paper flow-proof" aria-labelledby="flow-proof-title">
  <div class="wrap flow-proof-grid">
    <div><p class="flow-eyebrow">Know where you are visiting</p><h2 id="flow-proof-title">Care starts with a conversation.</h2><p>Meet our expert doctor in person, discuss your concerns and understand the proposed care before deciding to continue.</p><address>27/11, Swaraj Garden Road,<br>near One Nation Apartment, Pimple Saudagar.</address><p><a href="https://maps.google.com/?cid=3077549578320836260" target="_blank" rel="noopener">Read patient reviews on Google ↗</a></p></div>
    <div class="flow-video-card"><p class="flow-eyebrow">A patient’s own experience</p><h3>A ${knee ? 'knee-care' : 'spine-care'} video story</h3><div class="flow-video-slot"><button type="button" class="flow-video-button" data-video-id="${video}" aria-label="Play the ${knee ? 'knee-care' : 'spine-care'} patient video on Instagram"><span aria-hidden="true">▶</span>Watch the patient video<small>Loads Instagram only when you play</small></button></div><p class="flow-video-note">An individual experience, not a promise of your result. <a href="https://www.instagram.com/reel/${video}/" target="_blank" rel="noopener">Open on Instagram ↗</a></p></div>
  </div>
</section>

<!-- FIT -->
${fit}

${care}

<!-- SYMPTOM CHECK START -->
<div class="wrap flow-optional-check"><details class="flow-more"><summary>Optional: note the symptoms you want to discuss</summary>${check}</details></div>
<!-- SYMPTOM CHECK END -->

<!-- FAQ -->
${faq}

<!-- VISIT -->
${visit}

<!-- FINAL CTA -->
<section class="section final"><div class="wrap"><h2>Take the next step for your ${part}.</h2><p>₹500 in-clinic consultation · About 45 minutes · Pimple Saudagar</p><div class="cta-row"><a class="btn btn-primary" href="#book">Request a ₹500 consultation</a><a class="btn btn-outline" data-wa data-loc="final" href="https://wa.me/919819820017">Ask a question on WhatsApp</a></div><p class="flow-final-note">No payment online. The clinic confirms your appointment time.</p></div></section>
<!-- CONSULTATION FLOW END -->
</main>`;
  html = html.replace(/<main id="top">[\s\S]*?<\/main>/, main)
    .replace(/<div class="diwali-strip"[\s\S]*?<\/div>\s*/, '')
    .replace('<body>', '<body class="consultation-flow">')
    .replace(/<a class="btn btn-outline btn-sm only-desktop" href="#book">[\s\S]*?<\/a>/, '<a class="btn btn-primary btn-sm flow-header-book" href="#book">₹500 consultation</a>')
    .replace(/<a class="btn btn-wa btn-sm" data-wa data-loc="header"[\s\S]*?<\/a>/, '<a class="flow-header-contact" href="tel:+919819820017" data-loc="header">Call clinic</a>')
    .replace(/<link rel="preload" as="image" href="https:\/\/karmanyaayurveda.com\/images\/protocols\/[^"]+">\s*/, '')
    .replace(/\/\* ---------- Visit time options[\s\S]*?(?=  \/\* ---------- Tracking helpers)/, `/* ---------- Visit preference: clinic confirms the exact appointment ---------- */
  var sel = document.getElementById('slot');
  var opts = [['Not specified / Please call', 'Choose a preference (optional)'], ['Today or tomorrow', 'Today or tomorrow'], ['Within a week', 'This week'], ['Later / Information first', 'Later / I have questions first']];
  sel.innerHTML = '';
  opts.forEach(function (o) { var el = document.createElement('option'); el.value = o[0]; el.textContent = o[1]; sel.appendChild(el); });

`)
    .replace(/btn\.textContent = 'Request my slot'/g, "btn.textContent = 'Request a ₹500 consultation'")
    .replace(/Preferred time:/g, 'Visit preference:')
    .replace(/<nav class="sticky" id="sticky"[\s\S]*?<\/nav>/, '<nav class="sticky" id="sticky" aria-label="Quick contact"><a class="btn btn-outline" href="tel:+919819820017" data-loc="sticky" aria-label="Call the clinic"><svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg></a><a class="btn btn-primary" href="#book">₹500 consultation</a><a class="btn btn-outline" data-wa data-loc="sticky" href="https://wa.me/919819820017">WhatsApp</a></nav>');
  if (!html.includes('var preferenceEl =')) html = html.replace(/(document\.getElementById\('donePhone'\)\.textContent = [^\n]+;)/, "$1\n        var preferenceEl = document.getElementById('donePreference');\n        if (preferenceEl) preferenceEl.textContent = slotLabel;");
  // Eventual source rerenders keep the approved flow and anonymous conversion path.
  if (!html.includes('href="/landing-flow.css')) html = html.replace('</head>', '<link rel="stylesheet" href="/landing-flow.css?v=1">\n</head>');
  if (!html.includes('src="/consultation-flow.js')) html = html.replace('</body>', '<script src="/consultation-flow.js" defer></script>\n</body>');
  return html;
}

module.exports = { renderFlow };
