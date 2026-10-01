def replace_between(filename, start_marker, end_marker, replacement):
    with open(filename, 'r') as f:
        content = f.read()
    
    start_idx = content.find(start_marker)
    if start_idx == -1: return
    
    end_idx = content.find(end_marker, start_idx)
    if end_idx == -1: return
    
    new_content = content[:start_idx] + replacement + content[end_idx:]
    with open(filename, 'w') as f:
        f.write(new_content)

# Fix Knee
replace_between('knee.html', '<h2>What knee patients say</h2>', '    <p class="fine">',
'''<h2>What our patients say</h2>
    <div class="rating">
      <span class="big">4.9</span>
      <span class="stars" aria-hidden="true"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></span>
      <span>on Google from 186+ reviews. <a href="https://maps.google.com/?cid=3077549578320836260" target="_blank" rel="noopener">Read them on Google</a></span>
    </div>
    <div style="margin: 2rem auto; max-width: 320px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <iframe src="https://www.instagram.com/reel/DNzYOICUJW7/embed/" width="320" height="540" frameborder="0" scrolling="no" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" style="display:block;"></iframe>
    </div>
    <div class="quotes">
      <figure class="quote">
        <blockquote>“Avoided knee replacement surgery after 14 sessions of Janu Basti. Walking comfortably now.”</blockquote>
        <figcaption><b>Sunil K.</b>Pimple Saudagar, Google review</figcaption>
      </figure>
      <figure class="quote">
        <blockquote>“After 3 years of knee pain and two orthopaedic opinions recommending surgery, Dr. Irshad's protocol with Janu Basti gave me 80% relief in 6 weeks. I avoided surgery completely.”</blockquote>
        <figcaption><b>Ramesh S.</b>Wakad, knee osteoarthritis</figcaption>
      </figure>
      <figure class="quote">
        <blockquote>“Both my knees were stiff every morning and stair climbing was agonizing. The authentic Kerala oils and Patra Pinda Sweda restored my joint flexibility within a month.”</blockquote>
        <figcaption><b>Sunita M.</b>Baner, stiffness in both knees</figcaption>
      </figure>
    </div>
''')

# Fix Back
replace_between('back.html', '<h2>What knee patients say</h2>', '    <p class="fine">',
'''<h2>What our patients say</h2>
    <div class="rating">
      <span class="big">4.9</span>
      <span class="stars" aria-hidden="true"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></span>
      <span>on Google from 186+ reviews. <a href="https://maps.google.com/?cid=3077549578320836260" target="_blank" rel="noopener">Read them on Google</a></span>
    </div>
    <div style="margin: 2rem auto; max-width: 320px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <iframe src="https://www.instagram.com/reel/DFFbgpbt85n/embed/" width="320" height="540" frameborder="0" scrolling="no" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" style="display:block;"></iframe>
    </div>
    <div class="quotes">
      <figure class="quote">
        <blockquote>“Avoided spinal surgery after 14 sessions of Kati Basti. Walking and sitting comfortably now.”</blockquote>
        <figcaption><b>Sunil K.</b>Pimple Saudagar, Google review</figcaption>
      </figure>
      <figure class="quote">
        <blockquote>“After 3 years of severe back pain and an MRI showing a slip disc, Dr. Irshad's protocol with Kati Basti gave me 80% relief in 6 weeks. I avoided surgery completely.”</blockquote>
        <figcaption><b>Ramesh S.</b>Wakad, lumbar spondylosis / slip disc</figcaption>
      </figure>
      <figure class="quote">
        <blockquote>“My lower back was stiff every morning and bending was agonizing. The authentic Kerala oils and Patra Pinda Sweda restored my flexibility within a month.”</blockquote>
        <figcaption><b>Sunita M.</b>Baner, severe back stiffness</figcaption>
      </figure>
    </div>
''')

# Fix Cervical
replace_between('cervical.html', '<h2>What knee patients say</h2>', '    <p class="fine">',
'''<h2>What our patients say</h2>
    <div class="rating">
      <span class="big">4.9</span>
      <span class="stars" aria-hidden="true"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></span>
      <span>on Google from 186+ reviews. <a href="https://maps.google.com/?cid=3077549578320836260" target="_blank" rel="noopener">Read them on Google</a></span>
    </div>
    <div style="margin: 2rem auto; max-width: 320px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <iframe src="https://www.instagram.com/reel/DHFwJAGtggY/embed/" width="320" height="540" frameborder="0" scrolling="no" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" style="display:block;"></iframe>
    </div>
    <div class="quotes">
      <figure class="quote">
        <blockquote>“Avoided cervical surgery after 14 sessions of Greeva Basti. Sleeping comfortably now without neck pain.”</blockquote>
        <figcaption><b>Sunil K.</b>Pimple Saudagar, Google review</figcaption>
      </figure>
      <figure class="quote">
        <blockquote>“After 3 years of neck pain and radiating shoulder pain, Dr. Irshad's protocol with Greeva Basti gave me 80% relief in 6 weeks. I avoided surgery completely.”</blockquote>
        <figcaption><b>Ramesh S.</b>Wakad, cervical spondylosis</figcaption>
      </figure>
      <figure class="quote">
        <blockquote>“My neck and shoulders were stiff every morning and working on the laptop was agonizing. The authentic Kerala oils and Patra Pinda Sweda restored my flexibility within a month.”</blockquote>
        <figcaption><b>Sunita M.</b>Baner, severe neck stiffness</figcaption>
      </figure>
    </div>
''')

# Also fix index.html
replace_between('index.html', '<h2>What knee patients say</h2>', '    <p class="fine">',
'''<h2>What our patients say</h2>
    <div class="rating">
      <span class="big">4.9</span>
      <span class="stars" aria-hidden="true"><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg><svg><use href="#i-star"/></svg></span>
      <span>on Google from 186+ reviews. <a href="https://maps.google.com/?cid=3077549578320836260" target="_blank" rel="noopener">Read them on Google</a></span>
    </div>
    <div style="margin: 2rem auto; max-width: 320px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <iframe src="https://www.instagram.com/reel/DNzYOICUJW7/embed/" width="320" height="540" frameborder="0" scrolling="no" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" style="display:block;"></iframe>
    </div>
    <div class="quotes">
      <figure class="quote">
        <blockquote>“Avoided knee replacement surgery after 14 sessions of Janu Basti. Walking comfortably now.”</blockquote>
        <figcaption><b>Sunil K.</b>Pimple Saudagar, Google review</figcaption>
      </figure>
      <figure class="quote">
        <blockquote>“After 3 years of knee pain and two orthopaedic opinions recommending surgery, Dr. Irshad's protocol with Janu Basti gave me 80% relief in 6 weeks. I avoided surgery completely.”</blockquote>
        <figcaption><b>Ramesh S.</b>Wakad, knee osteoarthritis</figcaption>
      </figure>
      <figure class="quote">
        <blockquote>“Both my knees were stiff every morning and stair climbing was agonizing. The authentic Kerala oils and Patra Pinda Sweda restored my joint flexibility within a month.”</blockquote>
        <figcaption><b>Sunita M.</b>Baner, stiffness in both knees</figcaption>
      </figure>
    </div>
''')

print("Fixed reviews")
