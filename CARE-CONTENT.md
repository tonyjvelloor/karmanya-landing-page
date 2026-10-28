# Illustrated Kerala Ayurveda care sections

Updated 28 October 2026 for the knee landing routes (`index.html`, `knee.html`) and the spine route (`back.html`).

The two versions have original, separately tailored copy: five assessment topics, a six-part care-plan explanation, descriptions of traditional procedures, and a seven-step treatment journey. Authentic Kerala Ayurveda therapies are central to both versions. The anatomy, assessment topics, procedure image and treatment steps are visible in the scrolling page. Only longer care-plan and imaging explanations are expandable. The consultation form asks for visit readiness; the booking delivery and anonymous conversion rules are unchanged.

The approved visual direction is natural anatomy with varied coral, amber, slate-blue and lavender accents. Green is retained in the leaf illustration and existing brand controls. Seven original care illustrations and two new lifestyle illustrations were generated with the built-in image-generation tool, then encoded as WebP assets for the site. The new hero variants total approximately 90 KB across both conditions and widths. Conceptual anatomy is labelled as illustration, not a patient scan or treatment outcome; the new hero images are labelled lifestyle illustrations.

## Content and assets

- Edit `content/care-journeys.json` for the tailored section copy.
- Run `node scripts/render-care-sections.cjs` to update the committed HTML. Rendering is deterministic and uses no browser-side content fetch.
- The new visual page uses `visual-journey.css` and `scripts/visual-journey.cjs`. Existing `care-journey.css` and `landing-flow.css` remain shared with cervical; their output is unchanged.
- `scripts/render-consultation-flow.cjs` controls the knee/spine page order. See `CONSULTATION-FLOW.md`.
- Original care illustrations and prompts are in `images/care/`; the new hero variants and exact prompts are in `images/visual-journey/`.

## Claims and evidence

The copy describes traditional use and the clinic's proposed assessment/care process. Historical use is not described as proof of treatment efficacy. No cartilage regrowth, disc repair, nerve decompression, guaranteed surgery avoidance or fixed recovery result is promised. The knee and spine routes' old unverified patient counts, review totals, experience counts and written outcome quotations were removed. Readers can follow a direct link to the clinic's Google profile to read reviews in context.

The competing site's research references are not presented as evidence for Karmanya's treatments:

- [Stanford, 2020](https://med.stanford.edu/news/all-news/2020/08/Researchers-find-method-to-regrow-cartilage-in-the-joints.html) concerns laboratory research in mice and human tissue with microfracture and molecular signalling interventions. It does not establish efficacy of Karmanya's Ayurvedic therapies.
- [Cartilage mechanotransduction review](https://www.cambridge.org/core/journals/expert-reviews-in-molecular-medicine/article/integrins-cadherins-and-channels-in-cartilage-mechanotransduction-perspectives-for-future-regeneration-strategies/807D5D5D5820811CAC938CF4B898DC54) describes biological mechanisms and future research perspectives, not a Karmanya clinical trial.
- [National Institute of Ayurveda prospectus](https://www.nia.nic.in/pdf/bams-prospectus-2021.pdf) lists Janu Basti and Kati Basti among procedures provided by its Panchakarma unit. This supports a descriptive reference to established Ayurvedic practice, not a claim of a specific clinical outcome.
- [NICE osteoarthritis guidance](https://www.nice.org.uk/guidance/ng226/chapter/recommendations) advises against routine imaging for follow-up or to guide non-surgical osteoarthritis management.
- [NICE back pain and sciatica guidance](https://www.nice.org.uk/guidance/ng59/chapter/recommendations) advises against routine imaging in a non-specialist setting and limits specialist imaging to cases where results could change management.

Imaging in the new journey is therefore doctor-advised, not a mandatory baseline/repeat X-ray schedule or a 20-day regeneration test. Symptoms, daily function and clinical review are explained as parts of follow-up.

## Verification

Existing booking tests pass (`node --test tests/*.test.cjs`). HTML checks cover unique IDs, valid structured data, image assets and FAQ consistency. Desktop and mobile browser previews were inspected. No live test request was submitted for this design change.
