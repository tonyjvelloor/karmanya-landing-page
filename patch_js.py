import re
import glob

def patch_file(filename):
    with open(filename, 'r') as f:
        content = f.read()
        
    # 1. Fix fetch to check response.ok and remove no-cors
    old_fetch = "send = fetch(C.formEndpoint, { method: 'POST', body: fd, mode: 'no-cors', signal: ctrl ? ctrl.signal : undefined })\n        .then(function (r) { clearTimeout(timer); return true; })\n        .catch(function () { clearTimeout(timer); return false; });"
    new_fetch = "send = fetch(C.formEndpoint, { method: 'POST', body: fd, signal: ctrl ? ctrl.signal : undefined })\n        .then(function (r) { clearTimeout(timer); return r.ok; })\n        .catch(function () { clearTimeout(timer); return false; });"
    content = content.replace(old_fetch, new_fetch)
    
    # 2. Fix WhatsApp fallback click to not track a lead
    old_fallback = "a.addEventListener('click', function () { trackLead(leadId, 'whatsapp_fallback'); });"
    new_fallback = "a.addEventListener('click', function () { trackContact('whatsapp_fallback', 'form_error'); });"
    content = content.replace(old_fallback, new_fallback)

    # 3. Add preview guards to thank you and privacy pages (Wait, I'll do this in a separate script)
    
    with open(filename, 'w') as f:
        f.write(content)

for f in ['index.html', 'knee.html', 'back.html', 'cervical.html']:
    patch_file(f)

print("Patched fetch and tracking in main files.")
