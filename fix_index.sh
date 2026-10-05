#!/bin/bash

# Extract the script block
cat << 'ROUTER' > router.tmp
<!doctype html>
<html lang="en-IN">
<head>
<script>
(function(){
  var qs = location.search.toLowerCase();
  var h = location.hash.toLowerCase();
  var u = location.href.toLowerCase();
  var condition = 'knee';
  
  if (qs.indexOf('sciatica')>-1 || qs.indexOf('back')>-1 || qs.indexOf('spine')>-1 || qs.indexOf('lumbar')>-1 || u.indexOf('back')>-1 || u.indexOf('sciatica')>-1) {
      condition = 'back';
  } else if (qs.indexOf('cervical')>-1 || qs.indexOf('neck')>-1 || qs.indexOf('shoulder')>-1 || u.indexOf('cervical')>-1) {
      condition = 'cervical';
  }

  if (condition !== 'knee') {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/' + condition + '.html', false);
    try {
      xhr.send();
      if (xhr.status === 200) {
        document.open();
        document.write(xhr.responseText);
        document.close();
        window.stop();
      }
    } catch(e) {}
  }
})();
</script>
ROUTER

# Append the rest of knee.html starting from line 4
tail -n +4 /Users/tonyvelloor/.gemini/antigravity/scratch/karmanya-landing-page/knee.html >> router.tmp

mv router.tmp /Users/tonyvelloor/.gemini/antigravity/scratch/karmanya-landing-page/index.html
