import os
import glob
import re

new_html = """<div class="hero-media reels-carousel" style="display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 12px; scrollbar-width: none; -ms-overflow-style: none;">
      <div style="flex: 0 0 300px; scroll-snap-align: start; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.12); background: #fff;">
        <iframe src="https://www.instagram.com/reel/DHFwJAGtggY/embed/" width="300" height="540" frameborder="0" scrolling="no" allowtransparency="true" style="border: none; display: block;"></iframe>
      </div>
      <div style="flex: 0 0 300px; scroll-snap-align: start; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.12); background: #fff;">
        <iframe src="https://www.instagram.com/reel/DFFbgpbt85n/embed/" width="300" height="540" frameborder="0" scrolling="no" allowtransparency="true" style="border: none; display: block;"></iframe>
      </div>
      <div style="flex: 0 0 300px; scroll-snap-align: start; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.12); background: #fff;">
        <iframe src="https://www.instagram.com/reel/DNzYOICUJW7/embed/" width="300" height="540" frameborder="0" scrolling="no" allowtransparency="true" style="border: none; display: block;"></iframe>
      </div>
    </div>
    <style>
      .reels-carousel::-webkit-scrollbar { display: none; }
    </style>"""

files = ['/Users/tonyvelloor/.gemini/antigravity/scratch/karmanya-landing-page/back.html',
         '/Users/tonyvelloor/.gemini/antigravity/scratch/karmanya-landing-page/cervical.html']

for fpath in files:
    with open(fpath, 'r') as f:
        content = f.read()
    
    # We want to replace <figure class="hero-media"...</figure> with new_html
    pattern = r'<figure class="hero-media".*?</figure>'
    if re.search(pattern, content, re.DOTALL):
        content = re.sub(pattern, new_html, content, count=1, flags=re.DOTALL)
        with open(fpath, 'w') as f:
            f.write(content)
        print(f"Regex patched {fpath}")
    else:
        print(f"Could not find figure in {fpath}")

print("Regex patch complete!")
