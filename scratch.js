const host = 'consult.karmanyaayurveda.com';
const h = 'karmanyaayurveda.com';
const isProd = host === h || host.slice(-(h.length + 1)) === '.' + h;
console.log('isProd:', isProd);
