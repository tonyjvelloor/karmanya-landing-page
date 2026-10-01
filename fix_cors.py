for filename in ['knee.html', 'back.html', 'cervical.html']:
    with open(filename, 'r') as f:
        content = f.read()

    # Fix fetch by adding mode: 'no-cors'
    content = content.replace(
        "send = fetch(C.formEndpoint, { method: 'POST', body: fd, signal: ctrl ? ctrl.signal : undefined })",
        "send = fetch(C.formEndpoint, { method: 'POST', body: fd, mode: 'no-cors', signal: ctrl ? ctrl.signal : undefined })"
    )

    # Fix timeout to 15000 (15 seconds)
    content = content.replace(
        "var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);",
        "var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);"
    )

    with open(filename, 'w') as f:
        f.write(content)

print("Added no-cors mode to fetch.")
