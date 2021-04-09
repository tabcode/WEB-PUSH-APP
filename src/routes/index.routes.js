const { Router } = require('express');
const router = Router();
const webpush = require('../webpush');
let pushSubscription = {};

router.post('/subscription', async (req, res) => {
    pushSubscription = req.body;
    res.status(200).json();
});

router.post('/newMessage', async (req, res) => {

    const payload = JSON.stringify({
        title: 'My notification',
        message: req.body.message
    });

    try {
        await webpush.sendNotification(pushSubscription, payload);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;