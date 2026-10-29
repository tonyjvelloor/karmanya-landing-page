# Meta measurement audit — 29 October 2026

Dataset/pixel in all four booking pages: 2147354382501419.

| Action | Explicit browser event | Meaning |
| --- | --- | --- |
| Page load | PageView | Visit |
| Phone/WhatsApp tap | Contact with channel=call or whatsapp | Contact intent only |
| Booking service acknowledges a submission | Lead with eventID=lead_id | Received enquiry, not confirmed appointment |

Explicit events target this pixel only. Contact trackers fail independently. The failed-form WhatsApp fallback uses the WhatsApp action. No condition, symptoms, name or phone is included in these event parameters. The Meta SDK may still collect page URL/browser metadata; this is not a claim of fully anonymous tracking. Previews do not emit these events or submit bookings.

The public pixel configuration served on the audit date includes Event Setup Tool rules that derive Lead from button text containing 'request consultation' and 'consultation', and Contact rules for telephone/WhatsApp links. These rules can overlap explicit events or misclassify navigation as a lead. Automatic setup is disabled in the four page initializers. The remote Event Setup Tool rules still need review/removal in the authenticated Meta account; code changes alone do not prove those account rules were removed.

The public configuration also includes an OpenBridge gateway endpoint. This proves configuration only, not delivery, deduplication, or account ownership. Do not add a second CAPI integration without reviewing this connection. The public eventValidation lists were empty; this does not establish account-wide event eligibility or health-category status.

## Account verification still required

1. Sign in to Events Manager and select dataset 2147354382501419. Check Diagnostics, traffic permissions, data source category/restrictions, browser/server event delivery, and deduplication.
2. Review obsolete Event Setup Tool Lead/Contact rules; keep explicit events as the sole source for these website actions. Confirm with Test Events before and after.
3. In each active ad set check destination, dataset, permitted optimization event, attribution settings, and reporting columns. Report website Leads and Contacts separately. A website Contact is not a connected call.
4. Check actual ad URL parameters. Suggested Meta parameters: utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.id}}&utm_content={{ad.id}}. Verify the existing booking sheet stores the parameters already forwarded by the API. Never put patient information into URLs.
5. For the two historical phone calls, reconcile available call timestamps and source evidence. Without evidence, retain unknown source. Do not manufacture Meta Lead events or backdate browser events.
6. If confirmed calls need optimization signals, choose a consent-appropriate call attribution workflow after checking Meta's current health-data restrictions. Do not upload symptoms, diagnoses, or patient records to ad platforms.

Validation: local tests exercise explicit Meta calls with mocked SDKs; they do not prove receipt in Meta Events Manager. Live source verification confirms deployment only. No fake production lead or clinic test booking was submitted during this audit.
