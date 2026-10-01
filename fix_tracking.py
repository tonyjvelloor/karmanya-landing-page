for filename in ['knee.html', 'back.html', 'cervical.html']:
    with open(filename, 'r') as f:
        content = f.read()

    # Wrap the window.location.href in a setTimeout
    content = content.replace(
        "window.location.href = wa(text);",
        "setTimeout(function() { window.location.href = wa(text); }, 800);"
    )

    with open(filename, 'w') as f:
        f.write(content)

print("Patched redirect timing.")
