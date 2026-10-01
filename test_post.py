import urllib.request
import urllib.parse
import json

url = 'https://script.google.com/macros/s/AKfycbzhvbwKqfnAwPSDmRl-8stVBW1IOyHC1-i4cpOHckCUTdEg2FL6em6i8ESgc-4IQO_Y/exec'
data = urllib.parse.urlencode({'name': 'Tony Test', 'phone': '9999999999', 'concern': 'knee'}).encode('utf-8')
req = urllib.request.Request(url, data=data)

try:
    response = urllib.request.urlopen(req)
    print("Status:", response.status)
    print("Response:", response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
