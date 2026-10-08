import os
import glob

files = glob.glob('/Users/tonyvelloor/.gemini/antigravity/scratch/karmanya-landing-page/*.html')

old_line = "var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);"
new_line = "var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 35000);"

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    if old_line in content:
        content = content.replace(old_line, new_line)
        
        # Add a warmup ping inside the IIFE, right before the sticky bar logic
        if "/* ---------- Sticky bar" in content and "fetch(C.formEndpoint" not in content.split("/* ---------- Sticky bar")[1]:
            warmup = "\n  // Warm up the Apps Script container\n  if (C.formEndpoint && window.KA.isProd) fetch(C.formEndpoint, { mode: 'no-cors' }).catch(function(){});\n\n  /* ---------- Sticky bar"
            content = content.replace("/* ---------- Sticky bar", warmup)
            
        with open(f, 'w') as file:
            file.write(content)
        print(f"Patched {f}")

