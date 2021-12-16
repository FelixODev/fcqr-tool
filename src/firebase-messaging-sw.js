// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/[the number of version matching with firebase in package.json]/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/[for example: 7.16.1]/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyC-81rePFIiErd0qlxEiE4yTWa5rwzZVeI",
    authDomain: "amznbbq.web.app",
    projectId: "amznbbq",
    storageBucket: "amznbbq.appspot.com",
    messagingSenderId: "398903381488",
    appId: "1:398903381488:web:49e96b2a40be79b8d3e135"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();