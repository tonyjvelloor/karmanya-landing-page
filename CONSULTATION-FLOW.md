# Knee and spine consultation flow

Updated 28 October 2026. Scope: root knee page (`index.html`), `/knee`, and `/back`. Cervical and the main Karmanya website are unchanged.

## Visitor sequence

1. Condition-specific headline and authentic Kerala Ayurveda context.
2. ₹500 consultation fee, about 45 minutes, pay at clinic, and primary request action.
3. Visible consultation inclusions, separate therapy/medicine costs, hours, and Google location/reviews link.
4. Name, phone, who the visit is for, and optional visit-readiness preference. Desktop places the form beside the offer; mobile shows the offer first.
5. Clinic context and one relevant existing patient video. Instagram loads only after an explicit play action; a direct fallback link remains available. No new outcome quotation or review count is used.
6. Consultation suitability, a short care overview, expandable original illustrations and care journey, optional symptom notes, FAQ, directions, and final request action.

The mobile sticky bar prioritises the ₹500 consultation, with call and WhatsApp options. It retains the existing form-visibility behaviour.

## Booking and measurement

Readiness choices are optional: today/tomorrow, this week, or later/questions first. They use the existing `timeslot` payload field so clinic delivery stays compatible. This is a preference, not a confirmed appointment. The acknowledgement shows the preference and explains that the clinic will call to agree a time.

No online payment is requested. The upstream acknowledgement must still match the request before the success state or primary Ads conversion is emitted. Conversion parameters contain only the conversion destination and request transaction ID, never patient details or readiness. Preview domains cannot submit to the live clinic sheet.

## Maintenance and verification

Run `node scripts/render-care-sections.cjs`; it renders the care content and consultation layout deterministically. `consultation-flow.js` handles explicit video loading and opens expandable sections for existing fragment links. Shared styles and script load only on the scoped pages.

Verification: 24 automated booking/delivery/preview/tracking/video/deep-link tests pass; rendering is idempotent; unique IDs, structured data and local asset paths validate; mobile and desktop previews show no horizontal overflow. Empty-form validation was checked locally. No live patient request was sent for this change.

This layout is intended to reduce friction and clarify the enquiry; lead or appointment improvement must be measured after launch and is not guaranteed.
