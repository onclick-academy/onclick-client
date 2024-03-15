// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyB8BWtLPOvFa-_ySRCW_ZWfpUzhnyiPzCU",
  authDomain: "onclick-7f191.firebaseapp.com",
  projectId: "onclick-7f191",
  storageBucket: "onclick-7f191.appspot.com",
  messagingSenderId: "512189549333",
  appId: "1:512189549333:web:225427368bce8afc51f71c",
  measurementId: "G-7CX3D2QY2Q"
};

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(payload => {
    // let title = "New Notification";
    // let options = {
    //   body: "open to view",
    //   icon: "/app/favicon-96x96.png",
    //   link: ""
    // };
    // if (payload.data.title && payload.data.body && payload.data.type) {
    //   if (payload.data.type === "review") {
    //     title = "New review for " + payload.data.title || "unknown";
    //     options.body = payload.data.body;
    //   } else if (payload.data.type === "reservation") {
    //     title = "New booking from " + payload.data.title;
    //     options.body = "For class " + payload.data.body;
    //   } else if (payload.data.type === "response") {
    //     title = payload.data.title + " Responded";
    //     options.body =
    //       (Boolean(payload.data.body) === true ? "approved" : "declined") +
    //       " your request";
    //   } else if (payload.data.type === "chat") {
    //     title = payload.data.title;
    //     options.body = payload.data.body;
    //     options.link = payload.data.link;
    //   }
    // }
    // if (options.link) {
    //   options.data = {
    //     link: options.link
    //   };
    // }
    // console.log(options);

    self.registration.showNotification(payload);
  });
}
