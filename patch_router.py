import re

with open('index.html', 'r') as f:
    content = f.read()

old_router = """    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/' + condition + '.html', false);
    try {
      xhr.send();
      if (xhr.status === 200) {
        document.open();
        document.write(xhr.responseText);
        document.close();
      }
    } catch (e) {}"""

new_router = """    var newUrl = '/' + condition + '.html' + location.search + location.hash;
    window.location.replace(newUrl);"""

content = content.replace(old_router, new_router)

with open('index.html', 'w') as f:
    f.write(content)

print("Patched router in index.html.")
