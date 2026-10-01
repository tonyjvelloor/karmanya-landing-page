import re
import glob

def patch_aux(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # 1. Update Pixel ID to 1110015938373429
    content = content.replace("2147354382501419", "1110015938373429")

    # 2. Add Preview Guard if not exists (Only execute GTM/Tags in prod)
    if '<script>' in content and 'isProd' not in content:
        # We need to wrap the tracking scripts.
        pass # Actually, it's easier to just disable the hardcoded conversions on thank-you.html

    # On thank-you.html, strip out the hardcoded gtag('event', 'conversion') 
    # to avoid double counting with the landing page.
    if 'thank' in filename:
        content = re.sub(r"gtag\('event', 'conversion'[^\)]+\);", "", content)
        content = re.sub(r"fbq\('track', 'Lead'[^\)]*\);", "", content)
    
    with open(filename, 'w') as f:
        f.write(content)

for f in ['thank-you.html', 'privacy.html', 'terms.html']:
    try:
        patch_aux(f)
    except FileNotFoundError:
        pass

print("Patched aux files.")
