const url = 'https://script.google.com/macros/s/AKfycbzhvbwKqfnAwPSDmRl-8stVBW1IOyHC1-i4cpOHckCUTdEg2FL6em6i8ESgc-4IQO_Y/exec';
const body = new URLSearchParams();
body.append('name', 'Test');
fetch(url, { method: 'POST', body, redirect: 'follow' })
  .then(res => {
    console.log('Status:', res.status, res.statusText);
    console.log('CORS headers:', res.headers.get('access-control-allow-origin'));
    return res.text();
  })
  .then(text => console.log('Response:', text))
  .catch(err => console.error('Error:', err));
