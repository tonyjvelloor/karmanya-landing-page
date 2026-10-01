import glob

for filename in ['knee.html', 'back.html', 'cervical.html']:
    with open(filename, 'r') as f:
        content = f.read()

    # Increase timeout to 15s and ignore r.ok check (just return true if the request completes without network failure)
    content = content.replace(
        "var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 8000) : null;",
        "var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 15000) : null;"
    )
    content = content.replace(
        ".then(function (r) { clearTimeout(timer); return r.ok; })",
        ".then(function (r) { clearTimeout(timer); return true; })"
    )

    with open(filename, 'w') as f:
        f.write(content)

print("Patched form fetch logic in all HTML files.")
