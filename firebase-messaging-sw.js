// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging.js')
import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyB_Z0zstqHLmZCHCN0qafYG8eYOWTpwK0Y',
  authDomain: 'olx-app-9a451.firebaseapp.com',
  projectId: 'olx-app-9a451',
  storageBucket: 'olx-app-9a451.appspot.com',
  messagingSenderId: '430158411543',
  appId: '1:430158411543:web:7ae0bcb735ea9eed73e952',
  measurementId: 'G-4QLPCYRY9C'
}

const app = initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = getMessaging(app)

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)
  // Customize notification here
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
