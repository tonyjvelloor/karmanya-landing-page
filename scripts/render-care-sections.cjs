const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'content/care-journeys.json'), 'utf8'));
const { renderFlow } = require('./render-consultation-flow.cjs');
const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function expandedSections(kind) {
  const d = data[kind];
  const factors = data.sharedFactors.map(f => `<li class="ka-factor"><img src="/images/care/${f.image}.webp" alt="" width="480" height="480" loading="lazy"><div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div></li>`).join('\n');
  const plan = d.plan.map((s, i) => `<li><span class="ka-number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('\n');
  const journey = d.journey.map(s => `<li><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('\n');
  return `<!-- KARMANYA CARE START -->
<section class="ka-care ka-care--paper" id="whole-person-care" aria-labelledby="ka-context-title">
  <div class="wrap">
    <p class="ka-eyebrow">A whole-person assessment</p>
    <h2 id="ka-context-title">${esc(d.title)}</h2>
    <p class="ka-intro">${esc(d.intro)}</p>
    <div class="ka-context">
      <figure class="ka-anatomy"><img src="/images/care/${kind}.webp" alt="${esc(d.anatomyAlt)}" width="720" height="1080" loading="lazy"><figcaption>Original conceptual illustration. Not a patient scan or a treatment result.</figcaption></figure>
      <ul class="ka-factors" role="list">${factors}</ul>
    </div>
    <p class="ka-context-note">These are topics for discussion during assessment. They do not establish a diagnosis or show that any one factor caused your pain.</p>
  </div>
</section>
<section class="ka-care ka-care--warm" id="kerala-care-plan" aria-labelledby="ka-plan-title">
  <div class="wrap">
    <p class="ka-eyebrow">Authentic Kerala Ayurveda therapies</p>
    <h2 id="ka-plan-title">${esc(d.planTitle)}</h2>
    <p class="ka-intro">${esc(d.planIntro)}</p>
    <ol class="ka-plan" role="list">${plan}</ol>
    <div class="ka-therapy">
      <figure><img src="${esc(d.therapyImage)}" alt="${esc(d.therapyAlt)}" width="1024" height="768" loading="lazy"><figcaption>${esc(d.therapyCaption)}</figcaption></figure>
      <div><h3>${esc(d.therapyTitle)}</h3><ul>${d.therapies.map(t => '<li>' + esc(t) + '</li>').join('')}</ul><a class="btn btn-primary" href="#book">Discuss your care with a doctor</a></div>
    </div>
  </div>
</section>
<section class="ka-care ka-care--paper" id="treatment-journey" aria-labelledby="ka-journey-title">
  <div class="wrap">
    <p class="ka-eyebrow">Your treatment journey</p>
    <h2 id="ka-journey-title">${esc(d.journeyTitle)}</h2>
    <p class="ka-intro">${esc(d.journeyIntro)}</p>
    <div class="ka-journey">
      <aside class="ka-journey-side" aria-label="Your care at a glance">
        <h3>Assess.<br>Care.<br>Review.</h3>
        <ul class="ka-pillars" role="list"><li><b>Understand your starting point</b><span>A doctor-led assessment and goals that matter in daily life.</span></li><li><b>Care rooted in Kerala Ayurveda</b><span>Authentic Kerala Ayurveda therapies, chosen for the individual.</span></li><li><b>Review meaningful progress</b><span>Comfort, movement and everyday function guide the next conversation.</span></li></ul>
        <a class="btn" href="#book">Book your assessment</a><p class="ka-fee">₹500 consultation · About 45 minutes<br>Pimple Saudagar · Open daily, 10 AM–8 PM</p>
      </aside>
      <ol class="ka-timeline" role="list">${journey}</ol>
    </div>
    <details class="ka-imaging"><summary>Do I need an X-ray or MRI?</summary><p>${esc(d.imagingText)}</p></details>
  </div>
</section>
<!-- KARMANYA CARE END -->`;
}

function sections(kind) {
  const d = data[kind];
  const expanded = expandedSections(kind).match(/<section class="ka-care[\s\S]*?<\/section>/g);
  if (expanded.length !== 3) throw new Error('Expected three detailed care sections');
  const steps = [
    ['Meet your doctor', 'Discuss your symptoms and existing reports, have an individual examination and understand your starting point.'],
    ['Decide on suitable care', 'If appropriate, consider authentic Kerala Ayurveda therapies. Your doctor explains the proposed care, costs and review points before you decide.'],
    ['Review your everyday function', 'Review symptoms, movement and daily activities with your doctor. Care may continue, change or stop; specialist advice is recommended when needed.'],
  ];
  return `<!-- KARMANYA CARE START -->
<section class="flow-care-overview" aria-labelledby="flow-care-title"><div class="wrap">
  <div class="flow-care-intro"><figure><img src="/images/care/${kind}.webp" alt="${esc(d.anatomyAlt)}" width="720" height="1080" loading="lazy"></figure><div><p class="flow-eyebrow">Authentic Kerala Ayurveda therapies</p><h2 id="flow-care-title">Your care, one step at a time.</h2><p>Assessment first. An individual plan if suitable. Review with your doctor. The illustrations explain care topics; they are not patient scans or treatment results.</p></div></div>
  <ol class="flow-three-steps">${steps.map(([title,text]) => `<li><h3>${esc(title)}</h3><p>${esc(text)}</p></li>`).join('')}</ol>
  <details class="flow-more"><summary>Explore the health factors your doctor reviews</summary>${expanded[0]}</details>
  <details class="flow-more"><summary>See traditional Kerala therapies and care-plan details</summary>${expanded[1]}</details>
  <details class="flow-more"><summary>Read the full consultation-to-review journey</summary>${expanded[2]}</details>
</div></section>
<!-- KARMANYA CARE END -->`;
}

function questions(kind) {
  const knee = kind === 'knee';
  const cervical = kind === 'cervical';
  const part = knee ? 'knee' : (cervical ? 'neck' : 'spine');
  const procedure = knee ? 'Janu Basti' : (cervical ? 'Greeva Basti' : 'Kati Basti');
  const location = knee ? 'knee' : (cervical ? 'back of the neck' : 'lower back');
  const items = [
    ['Can Ayurveda replace surgery?', 'A consultation can explore suitable care options, but Ayurveda cannot be promised to remove the need for surgery. If surgery has been advised, discuss that recommendation with your treating doctor or relevant specialist before changing the plan.'],
    ['How many sessions will I need?', 'Your doctor explains the proposed duration and review intervals after assessment. There is no single course or recovery time that suits everyone; the plan is reviewed according to your response.'],
    ['What happens during ' + procedure + '?', 'When prescribed, a ring of dough holds warm medicated oil over the ' + location + ' while a therapist monitors your comfort. Tell the therapist if the heat or procedure feels uncomfortable.'],
    ['What does it cost?', 'The in-clinic assessment is ₹500 for about 45 minutes. Any proposed therapy or medicine costs are explained separately before you decide to begin.'],
    ['Can I keep taking my current medicines?', 'Bring a list of all medicines and supplements you take. Your doctor reviews the plan in that context. Do not stop or change prescribed medicines on your own.'],
    ['What should I bring to the first visit?', 'Bring any existing X-ray or MRI reports of your ' + part + ', a list of your medicines and comfortable clothing. New imaging is considered only when clinically useful.'],
    ['Is this an online consultation?', 'This page is for in-clinic assessments at Karmanya Ayurveda, Pimple Saudagar, Pune. Call the clinic if you have questions before visiting.'],
    ['Do I need to book, or can I walk in?', 'Booking ahead helps the clinic confirm availability. Call or submit a consultation request; your appointment is confirmed when the clinic agrees a time with you.'],
    ['How will my progress be reviewed?', 'Your doctor reviews symptoms and everyday function against your starting point and discusses whether care should continue, change or stop. Any repeat imaging is guided by clinical need.'],
  ];
  return [items[3], ['How is my appointment confirmed?', 'Send your request and visit preference. The clinic calls during opening hours, 10 AM to 8 PM, to confirm availability and agree an appointment time. No payment is taken online; the ₹500 consultation fee is paid at the clinic.'], items[5], items[6], items[1], items[2], items[4], items[0], items[8], items[7]];
}

function cleanClaims(html, kind) {
  const knee = kind === 'knee';
  const cervical = kind === 'cervical';
  const condition = knee ? 'knee' : (cervical ? 'neck and cervical spine' : 'back and spine');
  const defaultWa = `Namaste! I would like to book a ${knee ? 'knee' : (cervical ? 'cervical' : 'spine')} assessment at Karmanya Ayurveda, Pimple Saudagar. Please share an available slot.`;
  const angles = {
    default: { title: knee ? 'Ayurvedic Knee Pain Care in Pimple Saudagar' : (cervical ? 'Ayurvedic Neck & Cervical Care in Pimple Saudagar' : 'Ayurvedic Back Pain & Sciatica Care'), sub: `Doctor-led ${condition} care using authentic Kerala Ayurveda therapies, selected after an individual assessment in Pimple Saudagar.`, wa: defaultWa },
    surgery: { title: `Understand your ${cervical ? 'neck' : (knee ? 'knee' : 'spine')} care options`, sub: 'Bring your existing reports and treatment recommendations. Our expert doctor assesses suitability and explains when specialist advice is needed.', wa: defaultWa },
    parent: { title: `Ayurvedic ${cervical ? 'neck' : (knee ? 'knee' : 'spine')} care for your parent`, sub: 'Book an in-person assessment to discuss symptoms, daily limitations and appropriate authentic Kerala Ayurveda therapies.', wa: defaultWa, forWhom: 'Parent' },
    tried: { title: `A doctor-led review of persistent ${cervical ? 'neck' : (knee ? 'knee' : 'back')} pain`, sub: 'Discuss your symptoms, earlier care and daily goals before deciding on a personalised plan rooted in classical Kerala Ayurveda.', wa: defaultWa },
  };
  html = html.replace(/window\.KA_ANGLES = \{[\s\S]*?\n\};/, 'window.KA_ANGLES = ' + JSON.stringify(angles, null, 2) + ';');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${cervical ? 'Neck & Cervical Care' : (knee ? 'Knee Care' : 'Back Pain & Sciatica Care')} with Authentic Kerala Ayurveda | Pimple Saudagar</title>`);
  html = html.replace(/(<p class="sub" id="heroSub">)[\s\S]*?(<\/p>)/, '$1' + esc(angles.default.sub) + '$2');
  html = html.replace(/<ul class="proof">[\s\S]*?<\/ul>/, '<ul class="proof"><li><span>Assessment by <strong>our expert doctor</strong></span></li><li><span><strong>Authentic Kerala Ayurveda</strong> therapies</span></li><li><span>Open <strong>all 7 days</strong></span></li></ul>');
  html = html.replace(/<p class="offer">[\s\S]*?<\/p>/, '<p class="offer"><strong>₹500 in-clinic assessment</strong>, about 45 minutes. Discuss your symptoms and appropriate care with our expert doctor. Or call <a href="tel:+919819820017" data-loc="hero_text">+91 98198 20017</a>.</p>');
  html = html.replace(/(<a\b(?=[^>]*\bdata-wa\b)[^>]*\bhref=")[^"]+("[^>]*>)/g, '$1https://wa.me/919819820017?text=' + encodeURIComponent(defaultWa) + '$2');
  // Keep landing pages independent of a named doctor's availability.
  html = html.replace(/\n      <div class="docs-line">[\s\S]*?<\/div>\s*<p>[\s\S]*?<\/p>\s*<\/div>/, '');
  html = html.replace(/<!-- DOCTORS -->[\s\S]*?(?=<!-- REVIEWS -->)/, '');
  html = html.replace(/No franchise branches, no diluted care\./g, 'One clinic in Pimple Saudagar.');
  html = html.replace(/<h3>Likely a good fit if you have<\/h3>/g, '<h3>Topics to discuss at your consultation</h3>');
  html = html.replace(/<b>Genuine Kerala medicines<\/b><span>[^<]*<\/span>/g, '<b>Classical Kerala Ayurveda</b><span>Doctor-selected therapies rooted in Kerala’s Ayurvedic tradition.</span>');
  html = html.replace(/var msg = n >= 3[\s\S]*?if \(surgery\) msg \+= [^\n]+;/, "var msg = 'These symptoms can have different causes. An in-clinic assessment helps your doctor discuss appropriate care.';\n    if (surgery) msg += ' Bring your existing reports and treatment recommendations; discuss any change in care with your treating doctor.';");
  html = html.replace(/<!-- REVIEWS -->[\s\S]*?(?=<!-- WHY US -->)/, `<!-- REVIEWS -->
<section class="section paper"><div class="wrap"><h2>Read patient experiences in their original context</h2><p class="lede">Visit the clinic’s Google profile to read patient feedback directly. Individual experiences do not establish a result for another person.</p><p style="margin-top:24px"><a class="btn btn-outline" href="https://maps.google.com/?cid=3077549578320836260" target="_blank" rel="noopener">Read reviews on Google</a></p></div></section>\n\n`);
  const faq = questions(kind);
  const faqHtml = `<!-- FAQ -->\n<section class="section paper"><div class="wrap"><h2>Questions people ask before booking</h2><div class="faq">${faq.map(([q,a]) => `<details><summary>${esc(q)}<span class="plus" aria-hidden="true"><svg class="icon"><use href="#i-plus"/></svg></span></summary><p>${esc(a)}</p></details>`).join('\n')}</div></div></section>\n\n`;
  html = html.replace(/<!-- FAQ -->[\s\S]*?(?=<!-- VISIT -->)/, faqHtml);
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (match, source) => {
    const object = JSON.parse(source);
    if (object['@type'] === 'FAQPage') object.mainEntity = faq.map(([name,text]) => ({ '@type':'Question', name, acceptedAnswer: {'@type':'Answer',text} }));
    delete object.aggregateRating; delete object.review;
    return '<script type="application/ld+json">\n' + JSON.stringify(object, null, 2) + '\n</script>';
  });
  return html;
}

for (const [filename, kind] of [['index.html','knee'],['knee.html','knee'],['back.html','spine'],['cervical.html','cervical']]) {
  const file = path.join(root, filename);
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('<!-- KARMANYA CARE START -->')) html = html.replace(/<!-- KARMANYA CARE START -->[\s\S]*?<!-- KARMANYA CARE END -->/, sections(kind));
  else html = html.replace(/<!-- FIRST VISIT -->[\s\S]*?(?=<!-- FIT -->)/, sections(kind) + '\n\n');
  if (!html.includes('href="/care-journey.css')) html = html.replace('</head>', '<link rel="stylesheet" href="/care-journey.css?v=1">\n</head>');
  html = cleanClaims(html, kind);
  html = renderFlow(html, kind);
  fs.writeFileSync(file, html);
  console.log('Rendered', filename);
}
