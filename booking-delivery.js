(function (root) {
  'use strict';
  function newLeadId() {
    return 'consult-' + (root.crypto && root.crypto.randomUUID
      ? root.crypto.randomUUID() : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12));
  }
  function cleanPhone(value) {
    var phone = String(value || '').replace(/\D/g, '');
    if (phone.length === 12 && phone.slice(0, 2) === '91') phone = phone.slice(2);
    if (phone.length === 11 && phone.charAt(0) === '0') phone = phone.slice(1);
    return phone;
  }
  async function send(payload) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 35000);
    try {
      var response = await root.fetch('/api/consultation', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), signal: controller.signal,
      });
      if (!response.ok) throw new Error('Request not confirmed');
      var data = await response.json();
      if (data.ok !== true || data.leadId !== payload.lead_id) throw new Error('Request not confirmed');
      return data;
    } finally { clearTimeout(timer); }
  }
  root.KarmanyaBooking = { send: send, newLeadId: newLeadId, cleanPhone: cleanPhone };
})(window);
