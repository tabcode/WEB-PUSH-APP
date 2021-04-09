const PUBLIC_VAPID_KEY = 'BI7jtZbmNsFfRN7pE5hZTskqpLIPtCCE_MkxO_ukV9QR7F_0PoimpzfvRMYBuJNqk0Qi26bGpVJyQG8BKXdOLPo';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const subscription = async () => {
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    await fetch('/subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json"
        }
    });
};
const form = document.querySelector('#myform');
const message = document.querySelector('#message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await fetch('/newMessage', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message.value
        })
    });
    form.reset();
});

subscription();