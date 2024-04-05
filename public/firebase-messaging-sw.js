// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts(
  'https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyB8BWtLPOvFa-_ySRCW_ZWfpUzhnyiPzCU',
  authDomain: 'onclick-7f191.firebaseapp.com',
  projectId: 'onclick-7f191',
  storageBucket: 'onclick-7f191.appspot.com',
  messagingSenderId: '512189549333',
  appId: '1:512189549333:web:225427368bce8afc51f71c',
  measurementId: 'G-7CX3D2QY2Q'
};

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(firebaseConfig);
