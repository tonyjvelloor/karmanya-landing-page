/**
 * Karmanya Ayurveda - Google Apps Script OpenAI Conversions API Integration
 * 
 * Paste this snippet into your Google Apps Script editor (attached to your Leads Sheet)
 * and call `sendOpenAiConversion(e)` inside your `doPost(e)` handler.
 * 
 * Recommended: Store your OpenAI API key in Script Properties (Project Settings > Script Properties)
 * with the property name: OPENAI_API_KEY
 */

var OPENAI_CONFIG = {
  pixelId: "QD7NJpfsYPogKPpJnE1gqf",
  // Either set your key in Script Properties or paste directly here:
  apiKey: PropertiesService.getScriptProperties().getProperty("OPENAI_API_KEY") || "PASTE_YOUR_OPENAI_API_KEY_HERE"
};

/**
 * Forwards form lead to OpenAI Conversions API
 * @param {Object} e - Event parameter from doPost(e)
 */
function sendOpenAiConversion(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var leadId = p.lead_id || p.eventId || ('lead_' + Date.now().toString(36));
    var pageUrl = p.page || "https://consult.karmanyaayurveda.com";

    var endpoint = "https://bzr.openai.com/v1/events?pid=" + OPENAI_CONFIG.pixelId;

    var payload = {
      validate_only: false,
      events: [
        {
          id: leadId,
          type: "lead_created",
          timestamp_ms: Date.now(),
          source_url: pageUrl,
          action_source: "web",
          data: {
            type: "customer_action"
          }
        }
      ]
    };

    var options = {
      method: "post",
      contentType: "application/json",
      headers: {
        "Authorization": "Bearer " + OPENAI_CONFIG.apiKey
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(endpoint, options);
    Logger.log("OpenAI CAPI Result: " + response.getContentText());
  } catch (err) {
    Logger.log("OpenAI CAPI Error: " + err.message);
  }
}
