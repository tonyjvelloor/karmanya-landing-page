import re

old_url = 'https://script.google.com/macros/s/AKfycbyPsbTHLlJjdpxlqqgv0Pbp5pkoH6XoXCi8Y0iIt0HmYhahJ3cqoUB3Lbtleh4jEPUDnA/exec'
new_url = 'https://script.google.com/macros/s/AKfycbzhvbwKqfnAwPSDmRl-8stVBW1IOyHC1-i4cpOHckCUTdEg2FL6em6i8ESgc-4IQO_Y/exec'

for filename in ['knee.html', 'back.html', 'cervical.html']:
    with open(filename, 'r') as f:
        content = f.read()

    content = content.replace(old_url, new_url)

    with open(filename, 'w') as f:
        f.write(content)

print("Updated Google Sheet endpoint in all landing pages.")
