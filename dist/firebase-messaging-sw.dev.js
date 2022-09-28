"use strict";

var _app = require("firebase/app");

var _messaging = require("firebase/messaging");

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging.js');
var firebaseConfig = {
  apiKey: 'AIzaSyB_Z0zstqHLmZCHCN0qafYG8eYOWTpwK0Y',
  authDomain: 'olx-app-9a451.firebaseapp.com',
  projectId: 'olx-app-9a451',
  storageBucket: 'olx-app-9a451.appspot.com',
  messagingSenderId: '430158411543',
  appId: '1:430158411543:web:7ae0bcb735ea9eed73e952',
  measurementId: 'G-4QLPCYRY9C'
};
var app = (0, _app.initializeApp)(firebaseConfig); // Retrieve firebase messaging

var messaging = (0, _messaging.getMessaging)(app);
messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload); // Customize notification here

  var notificationTitle = payload.notification.title;
  var notificationOptions = {
    body: payload.notification.body
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});