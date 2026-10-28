const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const paths = {
  stairs: '<path d="M3 21h6v-6h6V9h6V3"/><path d="m4 9 5-5m-5 0h5v5"/>',
  chair: '<path d="M6 3v11h13v7M6 14v7M6 9h10v5M3 18h18"/>',
  walk: '<circle cx="13" cy="4" r="2"/><path d="m9 10 4-3 3 4 4 1m-7-5-2 7-5 7m5-7 5 3 2 4M9 10l-4 3"/>',
  desk: '<path d="M3 13h18M5 13v8m14-8v8M7 3h11v7H7zM3 21h5"/>',
  rest: '<path d="M3 18V7m0 8h18v6m-18-3h18M6 11h5v4H6zM11 13h7a3 3 0 0 1 3 3"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 5 3 3 5-5"/>',
  doctor: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2m-12-5h8m-4-4v8"/>',
  report: '<path d="M7 3h8l4 4v14H5V3h2m8 0v5h4M8 12h8m-8 4h6"/>',
  plan: '<path d="M5 4h14v17H5zM9 2h6v4H9zM8 11l1 1 2-2m2 1h3m-8 6 1 1 2-2m2 1h3"/>',
  leaf: '<path d="M20 3C8 3 3 7 5 14c2 7 14 7 15-11ZM4 21 16 9m-8 8v-5m4 1h5"/>',
  review: '<path d="M3 12a9 9 0 0 1 15-7l3 3m0-5v5h-5M21 12A9 9 0 0 1 6 19l-3-3m0 5v-5h5m4-8v5l3 2"/>',
  route: '<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v6a4 4 0 0 0 4 4h4m4 0V9a4 4 0 0 0-4-4h-4"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
};
const icon = name => `<svg class="vj-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
const request = label => `<a class="btn btn-primary" href="#book">${label || 'Request a ₹500 consultation'}</a>`;

function elementAt(html, start, tag) {
  if (start < 0) throw new Error('Missing ' + tag + ' in visual flow');
  const tags = new RegExp('<' + tag + '\\b[^>]*>|</' + tag + '>', 'g');
  tags.lastIndex = start;
  let depth = 0, match;
  while ((match = tags.exec(html))) {
    depth += match[0].startsWith('</') ? -1 : 1;
    if (!depth) return html.slice(start, tags.lastIndex);
  }
  throw new Error('Unbalanced ' + tag + ' in visual flow');
}
function section(html, id) {
  const at = html.indexOf('id="' + id + '"');
  return elementAt(html, html.lastIndexOf('<section', at), 'section');
}

function renderVisualCare(data, kind) {
  const knee = kind === 'knee', d = data[kind];
  const journey = knee ? [
    ['Request your assessment', 'Request a ₹500 consultation. The clinic calls to agree an appointment time.'],
    ['Meet our expert doctor', 'Discuss knee pain, daily limitations and medical history, followed by an individual examination.'],
    ['Share your starting point', 'Bring existing reports and medicines. Discuss walking, stairs and the activities that matter to you.'],
    ['Understand your options', 'Review suitability, proposed therapies, separate costs and review points before deciding to begin.'],
    ['Begin prescribed care', 'Receive the authentic Kerala Ayurveda therapies selected for you, if appropriate after assessment.'],
    ['Review everyday movement', 'Discuss symptoms, stiffness and daily activities at doctor-advised intervals. Imaging is based on clinical need.'],
    ['Agree on the next step', 'Continue, change or stop care after review. Seek specialist advice when recommended.'],
  ] : [
    ['Request your assessment', 'Request a ₹500 consultation. The clinic calls to agree an appointment time.'],
    ['Meet our expert doctor', 'Discuss back or leg symptoms, work routines and medical history, followed by an individual examination.'],
    ['Share your starting point', 'Bring existing reports and medicines. Discuss sitting, sleep, walking and everyday limitations.'],
    ['Understand your options', 'Review suitability, proposed therapies, separate costs and whether specialist advice is needed.'],
    ['Begin prescribed care', 'Receive the authentic Kerala Ayurveda therapies selected for you, if appropriate after assessment.'],
    ['Review everyday function', 'Discuss symptoms and daily activity at doctor-advised intervals. New or worsening symptoms need reassessment.'],
    ['Agree on the next step', 'Continue, change or stop care after review. Seek specialist advice when recommended.'],
  ];
  const journeyIcons = ['calendar','doctor','report','plan','leaf','review','route'];
  const therapyNames = knee ? ['Janu Basti','Patra Pinda Sweda','Lepam or Pichu'] : ['Kati Basti','Patra Pinda Sweda','Pichu or Lepam'];
  return `<!-- KARMANYA CARE START -->
<section class="ka-care vj-therapy-section" id="kerala-care-plan" aria-labelledby="ka-plan-title"><div class="wrap">
  <div class="vj-section-heading"><p class="vj-eyebrow">Authentic Kerala Ayurveda therapies</p><h2 id="ka-plan-title">Traditional care.<br>Chosen for you.</h2><p>Understand what your doctor may recommend, why it is being considered and what it involves before you decide.</p></div>
  <div class="vj-therapy-feature"><figure><img src="${esc(d.therapyImage)}" alt="${esc(d.therapyAlt)}" width="1024" height="768" loading="lazy"><figcaption>Procedure illustration · ${knee ? 'Janu Basti' : 'Kati Basti'}. Prescribed only after assessment.</figcaption></figure><div><p class="vj-eyebrow">${knee ? 'Knee care' : 'Back & spine care'}</p><h3>${knee ? 'Janu Basti' : 'Kati Basti'}</h3><p>${knee ? 'Warm medicated oil is held around the knee in a dough ring while the therapist monitors your comfort.' : 'Warm medicated oil is held over the lower back in a dough ring while the therapist monitors your comfort.'}</p><p class="vj-tradition">Rooted in Kerala’s Ayurvedic tradition. Your examination guides whether this procedure is suitable for you.</p><a class="vj-text-link" href="#book">Discuss suitability with our expert doctor <span aria-hidden="true">↗</span></a></div></div>
  <ul class="vj-therapy-options" role="list">${d.therapies.map((text,i) => `<li><span class="vj-icon-disc">${icon(i ? 'leaf' : 'plan')}</span><h3>${therapyNames[i]}</h3><p>${esc(text.slice(text.indexOf(':')+1).trim())}</p></li>`).join('')}</ul>
  <details class="vj-copy-details"><summary>How is my care plan personalised?</summary><ol class="vj-plan-list">${d.plan.map(p=>`<li><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join('')}</ol></details>
  <div class="vj-inline-cta"><div><strong>Your first step is an assessment.</strong><p>₹500 consultation · About 45 minutes · Pay at the clinic</p></div>${request()}</div>
</div></section>

<section class="ka-care vj-context-section" id="whole-person-care" aria-labelledby="ka-context-title"><div class="wrap">
  <div class="vj-section-heading"><p class="vj-eyebrow">The whole picture matters</p><h2 id="ka-context-title">${knee ? 'Your knee is part of a bigger picture.' : 'Your back is part of a bigger picture.'}</h2><p>${esc(d.intro)}</p></div>
  <div class="vj-assessment-grid"><figure class="vj-anatomy"><img src="/images/care/${kind}.webp" alt="${esc(d.anatomyAlt)}" width="720" height="1080" loading="lazy"><figcaption>Conceptual anatomy illustration.<br>Not a patient scan or treatment result.</figcaption></figure><div><p class="vj-eyebrow">Topics your doctor may review</p><ul class="vj-factor-grid" role="list">${data.sharedFactors.map(f=>`<li><img src="/images/care/${f.image}.webp" alt="" width="480" height="480" loading="lazy"><div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div></li>`).join('')}</ul></div></div>
  <p class="vj-small-note">These topics help guide a discussion. They do not establish a diagnosis or prove that any one factor caused your pain.</p>
</div></section>

<section class="ka-care vj-journey-section" id="treatment-journey" aria-labelledby="ka-journey-title"><div class="wrap">
  <div class="vj-section-heading"><p class="vj-eyebrow">From your first call to follow-up</p><h2 id="ka-journey-title">${esc(d.journeyTitle)}</h2><p>Know what happens next. Ask questions, understand the costs and make each decision with your doctor.</p></div>
  <ol class="vj-journey-list" role="list">${journey.map(([title,text],i)=>`<li><span class="vj-journey-icon">${icon(journeyIcons[i])}<span>${String(i+1).padStart(2,'0')}</span></span><div><h3>${esc(title)}</h3><p>${esc(text)}</p></div></li>`).join('')}</ol>
  <details class="vj-copy-details"><summary>Do I need an X-ray or MRI?</summary><p>${esc(d.imagingText)}</p></details>
  <div class="vj-inline-cta"><div><strong>Start with a clear conversation.</strong><p>Our expert doctor helps you understand the next step.</p></div>${request()}</div>
</div></section>
<!-- KARMANYA CARE END -->`;
}

function renderVisualFlow(html, kind) {
  const knee = kind === 'knee', asset = knee ? 'knee' : 'back';
  const form = elementAt(html, html.indexOf('<div class="card-form" id="book">'), 'div');
  const therapy = section(html, 'kerala-care-plan'), context = section(html, 'whole-person-care'), journey = section(html, 'treatment-journey');
  const oldProof = elementAt(html, html.indexOf('<section class="section paper flow-proof"'), 'section');
  const stories = elementAt(oldProof, oldProof.indexOf('<div class="flow-testimonials"'), 'div');
  const fitAt = html.indexOf('<!-- FIT -->');
  let fit = elementAt(html, html.indexOf('<section', fitAt), 'section');
  fit = fit.replace('We would rather tell you now than waste your time.', 'An assessment helps establish whether this care is suitable for you.');
  const check = elementAt(html, html.indexOf('<div class="wrap flow-optional-check"'), 'div');
  const faqAt = html.indexOf('<!-- FAQ -->');
  const faq = elementAt(html, html.indexOf('<section', faqAt), 'section');
  const goals = knee ? [
    ['stairs','Stairs & getting up','Pain on stairs, stiffness after sitting, or trouble rising from a chair?'],
    ['walk','Walking & daily activity','Tell your doctor what feels difficult and what you would like to do more comfortably.'],
    ['report','Understanding your options','Bring your existing reports and earlier treatment advice to discuss your next step.'],
  ] : [
    ['desk','Sitting & work','Back pain or stiffness affecting your desk routine, driving or getting up?'],
    ['rest','Rest & everyday comfort','Discuss how symptoms affect sleep, bending and the tasks you need to manage.'],
    ['walk','Walking & leg symptoms','Describe back pain, radiating leg symptoms and any change in your everyday movement.'],
  ];
  const heroTitle = knee ? 'Ayurvedic care for knee pain.' : 'Ayurvedic care for back pain.';
  const sub = knee ? 'Pain on stairs, stiffness or difficulty walking? Meet our expert doctor and understand the care suitable for you.' : 'Back pain or sciatica affecting everyday life? Meet our expert doctor and understand the care suitable for you.';
  const main = `<main id="top">
<!-- CONSULTATION FLOW START -->
<section class="hero flow-hero"><div class="wrap flow-hero-grid"><div class="hero-copy">
  <p class="kicker">Pimple Saudagar, Pune · In-clinic care</p>
  <div class="vj-hero-heading"><div><p class="vj-eyebrow">Authentic Kerala Ayurveda</p><h1 id="heroTitle">${heroTitle}</h1></div><figure class="vj-hero-art"><img src="/images/visual-journey/${asset}-everyday-320.webp" srcset="/images/visual-journey/${asset}-everyday-320.webp 320w, /images/visual-journey/${asset}-everyday-640.webp 640w" sizes="(min-width: 960px) 220px, 112px" alt="${knee ? 'Lifestyle illustration of an Indian woman seated with a hand resting on her knee' : 'Lifestyle illustration of an Indian man pausing beside a desk with a hand on his lower back'}" width="640" height="800" fetchpriority="high"><figcaption>Lifestyle illustration</figcaption></figure></div>
  <p class="sub" id="heroSub">${esc(sub)}</p>
  <script>(function(){var a=window.KA_ANGLES[window.KA.angle];if(window.KA.angle!=='default'){document.getElementById('heroTitle').textContent=a.title;document.getElementById('heroSub').textContent=a.sub;}})();</script>
  <p class="flow-fee"><strong>₹500 in-clinic consultation</strong><span>About 45 minutes · Pay at the clinic</span></p>
  <div class="cta-row" id="heroCtas">${request()}<a class="flow-question" href="tel:+919819820017" data-loc="hero_text">Questions? Call the clinic</a></div>
  <p class="flow-confirm">The clinic calls to confirm your appointment time.</p>
  <ul class="flow-inclusions" aria-label="Your consultation includes"><li>${icon('doctor')}<span>Individual examination with our expert doctor</span></li><li>${icon('report')}<span>Discussion of symptoms, history and existing reports</span></li><li>${icon('plan')}<span>Suitable options, proposed costs and next steps</span></li></ul>
  <p class="flow-cost-note">Therapy and medicines cost extra, if recommended. Understand the costs before you decide.</p>
  <div class="flow-trust-strip"><span>Open daily · 10 AM–8 PM</span><a href="https://maps.google.com/?cid=3077549578320836260" target="_blank" rel="noopener">Google reviews &amp; directions ↗</a></div>
</div><!-- BOOKING FORM START -->${form}<!-- BOOKING FORM END --></div></section>

<nav class="vj-page-nav" aria-label="Explore this page"><div class="wrap"><a href="#kerala-care-plan">Kerala therapies</a><a href="#flow-stories-title">Patient stories</a><a href="#treatment-journey">Your care journey</a><a href="#visit-clinic">Find the clinic</a></div></nav>

<section class="vj-everyday" aria-labelledby="vj-everyday-title"><div class="wrap"><div class="vj-section-heading"><p class="vj-eyebrow">Start with what matters to you</p><h2 id="vj-everyday-title">When ${knee ? 'knee' : 'back'} pain<br>gets in the way.</h2><p>Tell your doctor what feels difficult, so your assessment starts with your everyday needs.</p></div><ul class="vj-goal-grid" role="list">${goals.map(([i,t,p])=>`<li><span class="vj-icon-disc">${icon(i)}</span><h3>${esc(t)}</h3><p>${esc(p)}</p></li>`).join('')}</ul></div></section>

<!-- KARMANYA CARE START -->
${therapy}
<section class="section paper flow-proof" aria-labelledby="flow-stories-title"><div class="wrap">${stories}<p class="vj-reviews-link"><a href="https://maps.google.com/?cid=3077549578320836260" target="_blank" rel="noopener">Read more patient feedback on Google ↗</a></p></div></section>
${context}
${journey}
<!-- KARMANYA CARE END -->

<!-- FIT -->${fit}
<!-- SYMPTOM CHECK START -->${check}<!-- SYMPTOM CHECK END -->
<!-- FAQ -->${faq}

<!-- VISIT -->
<section class="section vj-visit" id="visit-clinic" aria-labelledby="vj-visit-title"><div class="wrap vj-visit-grid"><div><p class="vj-eyebrow">One next step. One local clinic.</p><h2 id="vj-visit-title">Visit us in<br>Pimple Saudagar.</h2><p>Meet our expert doctor in person and understand your options before choosing a care plan.</p><ul class="vj-bring" role="list"><li>${icon('report')}<span>Bring existing reports and a list of medicines</span></li><li>${icon('chair')}<span>Wear comfortable clothing for your assessment</span></li><li>${icon('calendar')}<span>Let the clinic confirm a suitable appointment time</span></li></ul></div><div class="vj-address-card"><span class="vj-icon-disc">${icon('pin')}</span><h3>Karmanya Ayurveda Chikitsalaya</h3><address>27/11, Swaraj Garden Road,<br>near One Nation Apartment,<br>Pimple Saudagar, Pune 411027</address><p>Open every day · 10 AM–8 PM<br><a href="tel:+919819820017" data-loc="visit">+91 98198 20017</a></p><a class="btn btn-outline" href="https://maps.google.com/?cid=3077549578320836260" target="_blank" rel="noopener">Get directions on Google Maps ↗</a><p class="vj-small-note">Check Maps for your route and current travel time.</p></div></div></section>

<!-- FINAL CTA -->
<section class="section final vj-final"><div class="wrap"><p class="vj-eyebrow">Your next step can be a conversation</p><h2>Understand your ${knee ? 'knee' : 'back'} care options.</h2><p>₹500 in-clinic consultation · About 45 minutes · Pimple Saudagar</p><div class="cta-row">${request()}<a class="btn btn-outline" data-wa data-loc="final" href="https://wa.me/919819820017">Ask a question on WhatsApp</a></div><p class="flow-final-note">Pay at the clinic. Your appointment time is confirmed by a call.</p></div></section>
<!-- CONSULTATION FLOW END -->
</main>`;
  html = html.replace(/<main id="top">[\s\S]*?<\/main>/, main)
    .replace('class="consultation-flow"', 'class="consultation-flow visual-journey"');
  const condition = knee ? 'knee pain' : 'back pain and sciatica';
  const pageTitle = `${knee ? 'Knee Pain' : 'Back Pain'} Care with Kerala Ayurveda | Karmanya, Pune`;
  const pageDescription = `Meet our expert doctor to discuss ${condition} and appropriate Kerala Ayurveda care. ₹500 in-clinic consultation in Pimple Saudagar, Pune; therapies are considered after assessment.`;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${pageTitle}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${pageDescription}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${pageTitle}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${pageDescription}">`);
  if (!html.includes('href="/visual-journey.css')) html = html.replace('</head>', '<link rel="stylesheet" href="/visual-journey.css?v=1">\n</head>');
  // Keep structured location information consistent with the clinic's supplied Maps listing.
  html = html.replace('"latitude": 18.5956', '"latitude": 18.6007587').replace('"longitude": 73.7979', '"longitude": 73.8076443');
  return html;
}

module.exports = { renderVisualCare, renderVisualFlow };
