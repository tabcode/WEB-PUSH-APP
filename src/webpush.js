const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:up170127@alumnos.upa.edu.mx',
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
);

module.exports = webpush;