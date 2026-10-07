import glob

html_to_add = """
<a class="floating-wa-desktop" data-wa data-loc="floating" href="https://wa.me/919819820017?text=Namaste!%20I'd%20like%20to%20book%20a%20Pre-Surgery%20Second%20Opinion%20Consult%20with%20an%20expert%20doctor." target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg class="icon" aria-hidden="true"><use href="#i-chat"/></svg>
</a>
"""

files = glob.glob('/Users/tonyvelloor/.gemini/antigravity/scratch/karmanya-landing-page/*.html')

for fpath in files:
    with open(fpath, 'r') as f:
        content = f.read()
    
    if 'floating-wa-desktop' not in content:
        content = content.replace('</body>', html_to_add + '\n</body>')
        with open(fpath, 'w') as f:
            f.write(content)

print("Floating WA added!")
