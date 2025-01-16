import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: 'playstation_management2014', // Replace with your PUSHER_APP_KEY
    wsHost: window.location.hostname, // Replace with your WebSocket server host
    cluster: 'mt1',
    wsPort: 6001, // Replace with your WebSocket server port
    forceTLS: false,
    disableStats: true,
});

export default echo;