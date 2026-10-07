import os
import glob

# HTML to insert
video_html = """
    <figure class="hero-media" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 12px 30px rgba(0,0,0,0.15); margin-bottom: 20px; background: #000;">
      <!-- TODO: Replace 'YOUR_YOUTUBE_ID' with the actual YouTube Video ID of the testimonial -->
      <iframe src="https://www.youtube.com/embed/YOUR_YOUTUBE_ID?rel=0&showinfo=0&autoplay=0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </figure>
"""

# HTML to replace
img_html_knee = """    <figure class="hero-media">
      <img src="https://karmanyaayurveda.com/images/protocols/protocol-knee-janu-basti.webp" alt="Janu Basti knee treatment: warm medicated oil poured into a ring of herbal dough on the knee" width="1024" height="682" fetchpriority="high">
      <figcaption>Janu Basti at our Pimple Saudagar clinic</figcaption>
    </figure>"""

img_html_back = """    <figure class="hero-media">
      <img src="https://karmanyaayurveda.com/images/protocols/protocol-back-kati-basti.webp" alt="Kati Basti lower back treatment" width="1024" height="682" fetchpriority="high">
      <figcaption>Kati Basti at our Pimple Saudagar clinic</figcaption>
    </figure>"""

img_html_cervical = """    <figure class="hero-media">
      <img src="https://karmanyaayurveda.com/images/protocols/protocol-cervical-greeva-basti.webp" alt="Greeva Basti neck treatment" width="1024" height="682" fetchpriority="high">
      <figcaption>Greeva Basti at our Pimple Saudagar clinic</figcaption>
    </figure>"""

files = glob.glob('/Users/tonyvelloor/.gemini/antigravity/scratch/karmanya-landing-page/*.html')

for fpath in files:
    with open(fpath, 'r') as f:
        content = f.read()
    
    # Replace img with video
    content = content.replace(img_html_knee, video_html.strip())
    content = content.replace(img_html_back, video_html.strip())
    content = content.replace(img_html_cervical, video_html.strip())
    
    with open(fpath, 'w') as f:
        f.write(content)

print("Video injected successfully!")
