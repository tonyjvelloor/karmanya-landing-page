import re
import json
import os

def parse_faqs(html):
    faqs = []
    # Find all <details> blocks
    details_blocks = re.findall(r'<details>(.*?)</details>', html, re.DOTALL)
    for block in details_blocks:
        # Extract question from <summary>
        q_match = re.search(r'<summary>(.*?)<span', block, re.DOTALL)
        if not q_match:
            continue
        question = q_match.group(1).strip()
        
        # Extract answer from <p>
        a_match = re.search(r'<p>(.*?)</p>', block, re.DOTALL)
        if not a_match:
            continue
        answer = a_match.group(1).strip()
        
        faqs.append({
            "@type": "Question",
            "name": question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": answer
            }
        })
    return faqs

for filename in ['knee.html', 'back.html', 'cervical.html']:
    if not os.path.exists(filename):
        continue
        
    with open(filename, 'r') as f:
        html = f.read()
        
    faqs = parse_faqs(html)
    if not faqs:
        print(f"No FAQs found in {filename}")
        continue
        
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs
    }
    
    schema_script = f'<script type="application/ld+json">\n{json.dumps(schema, indent=2)}\n</script>\n</head>'
    
    if '"@type": "FAQPage"' in html:
        print(f"FAQPage schema already exists in {filename}")
        continue
        
    new_html = html.replace('</head>', schema_script, 1)
    
    with open(filename, 'w') as f:
        f.write(new_html)
        
    print(f"Added FAQPage schema to {filename}")

