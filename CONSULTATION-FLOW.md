# Knee and spine consultation flow

Updated 28 October 2026. Scope: root knee page (`index.html`), `/knee`, and `/back`. Cervical and the main Karmanya website are unchanged.

## Visitor sequence

1. Condition-specific headline and authentic Kerala Ayurveda context.
2. ₹500 consultation fee, about 45 minutes, pay at clinic, and primary request action.
3. Visible consultation inclusions, separate therapy/medicine costs, hours, and Google location/reviews link.
4. Name, phone, who the visit is for, and optional visit-readiness preference. Desktop places the form beside the offer; mobile shows the offer first.
5. A short anchor menu and three condition-specific everyday concerns help visitors recognise their reason for seeking care.
6. The Kerala therapy section shows a procedure illustration, suitability explanation, and treatment options. The six detailed care-plan factors remain optional text.
7. All three original patient videos follow the care explanation. The two featured videos appear first (DHFwJAGtggY, DFFbgpbt85n), followed by the Malayalam video (DNzYOICUJW7). Previews are visible without opening a panel or clicking an extra placeholder; Instagram frames use native lazy loading and no autoplay. Each has a direct Instagram fallback link. No new outcome quotation or review count is used.
8. A visible anatomy illustration and five illustrated assessment topics lead into seven illustrated care steps. No image is hidden inside an expandable panel.
9. Consultation suitability, optional symptom notes, FAQ, clinic address and directions, and final request action finish the page.

The mobile sticky bar prioritises the ₹500 consultation, with call and WhatsApp options. It retains the existing form-visibility behaviour.

## Booking and measurement

Readiness choices are optional: today/tomorrow, this week, or later/questions first. They use the existing `timeslot` payload field so clinic delivery stays compatible. This is a preference, not a confirmed appointment. The acknowledgement shows the preference and explains that the clinic will call to agree a time.

No online payment is requested. The upstream acknowledgement must still match the request before the success state or primary Ads conversion is emitted. Conversion parameters contain only the conversion destination and request transaction ID, never patient details or readiness. Preview domains cannot submit to the live clinic sheet.

## Maintenance and verification

Run `node scripts/render-care-sections.cjs`; it renders the care content and consultation layout deterministically. `consultation-flow.js` opens expandable sections for existing fragment links. Shared styles and script load only on the scoped pages.

Verification: 28 automated booking/delivery/preview/tracking/testimonial-order/deep-link tests pass; rendering is idempotent; unique IDs, structured data and local asset paths validate; mobile and desktop previews show no horizontal overflow. No live patient request was sent for this design change.

This layout is intended to reduce friction and clarify the enquiry; lead or appointment improvement must be measured after launch and is not guaranteed.
