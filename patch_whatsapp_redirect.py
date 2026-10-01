import re

for filename in ['knee.html', 'back.html', 'cervical.html']:
    with open(filename, 'r') as f:
        content = f.read()

    # We need to replace the block inside if (sent) { ... }
    
    old_block = """        document.getElementById('formWrap').hidden = true;
        var done = document.getElementById('doneWrap');
        document.getElementById('doneTitle').textContent = 'Request received, ' + name.split(' ')[0] + '.';
        document.getElementById('donePhone').textContent = '+91 ' + phone.slice(0, 5) + ' ' + phone.slice(5);"""

    new_block = """        // Automatically redirect to WhatsApp after form submission
        var text = 'Namaste! I would like to book an assessment at Karmanya Ayurveda, Pimple Saudagar.\\nName: ' + name + '\\nMobile: ' + phone + '\\nFor: ' + forWhom + '\\nPreferred time: ' + slotLabel;
        window.location.href = wa(text);
        
        // Fallback UI just in case the redirect is blocked
        document.getElementById('formWrap').hidden = true;
        var done = document.getElementById('doneWrap');
        document.getElementById('doneTitle').textContent = 'Request received, ' + name.split(' ')[0] + '.';
        document.getElementById('donePhone').textContent = '+91 ' + phone.slice(0, 5) + ' ' + phone.slice(5);"""

    content = content.replace(old_block, new_block)

    with open(filename, 'w') as f:
        f.write(content)

print("Patched success redirect logic in all HTML files.")
