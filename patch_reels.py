import os
import glob

# HTML to replace
old_html = """<figure class="hero-media" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 12px 30px rgba(0,0,0,0.15); margin-bottom: 20px; background: #000;">
      <!-- TODO: Replace 'YOUR_YOUTUBE_ID' with the actual YouTube Video ID of the testimonial -->
      <iframe src="https://www.youtube.com/embed/YOUR_YOUTUBE_ID?rel=0&showinfo=0&autoplay=0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </figure>"""

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

files = glob.glob('/Users/tonyvelloor/.gemini/antigravity/scratch/karmanya-landing-page/*.html')

for fpath in files:
    with open(fpath, 'r') as f:
        content = f.read()
    
    if old_html in content:
        content = content.replace(old_html, new_html)
        with open(fpath, 'w') as f:
            f.write(content)
        print(f"Patched {fpath}")
    else:
        print(f"Could not find old html in {fpath}")

print("Reels injected successfully!")
