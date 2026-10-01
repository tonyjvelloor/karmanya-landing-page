import re

def insert_video(filename, video_id, condition_label):
    with open(filename, 'r') as f:
        content = f.read()

    video_html = f"""    <div style="margin: 2rem auto; max-width: 320px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <iframe src="https://www.instagram.com/reel/{video_id}/embed/" width="320" height="540" frameborder="0" scrolling="no" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" style="display:block;"></iframe>
    </div>
"""
    
    # Insert right before <div class="quotes">
    content = content.replace('<div class="quotes">', video_html + '    <div class="quotes">')

    with open(filename, 'w') as f:
        f.write(content)

insert_video('knee.html', 'DNzYOICUJW7', 'Knee')
insert_video('back.html', 'DFFbgpbt85n', 'Spine')
insert_video('cervical.html', 'DHFwJAGtggY', 'Cervical')

print("Videos inserted.")
