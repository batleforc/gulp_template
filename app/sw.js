importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
importScripts("https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.15.1/firebase-messaging.js");

var firebaseConfig = {
  apiKey: "AIzaSyCjcUDiwXpV888kbjvixyjLt0JoxlOegU8",
  authDomain: "template-54d73.firebaseapp.com",
  databaseURL: "https://template-54d73.firebaseio.com",
  projectId: "template-54d73",
  storageBucket: "template-54d73.appspot.com",
  messagingSenderId: "180169598396",
  appId: "1:180169598396:web:84dfdd03c8536b6e1437b9"
};
var token;
const vapipublic="BOlh24I5TR7jPJJUNHT7UAG7oZr90fjAB8OGuPVvHhDC21VBfwypluguEysXpCuEK-paELmJFO1OXGM5raboQl8";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.messaging().usePublicVapidKey(vapipublic)

async function requestPermission() {
  var permission = await Notification.requestPermission;
  if (permission === 'granted') {
    getToken();
  } else {
    console.log("😢 Tu ne veux pas de mes notification ? Je suis triste ><")
  }
}
requestPermission();

async function getToken() {
   token = await firebase.messaging().getToken();
  if (token) {
    console.log("Notification activer " + token)
  }
}

async function RefreshToken() {
   token = await firebase.messaging().onTokenRefresh();
  if (token) {
    console.log("Token mis a jour "+ token);
    RefreshToken();
  }
}



firebase.messaging().setBackgroundMessageHandler((payload) => {
  const title = 'Hello world!';
  const notificationOptions = {
    body: 'Ping?',
    icon: 'media/maskicon.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.addEventListener('notificationclose', event=>{
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;

  console.log('Closed notification'+ primaryKey);
})

self.addEventListener('notificationclick',event=>{
  console.log('Clic on notification')
  clients.openWindow('/');
})

self.addEventListener('push', event => {
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Default body';
  }

  const options = {
    body: body,
    icon: 'media/maskicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {action: 'explore', title: 'Go to the site'},
      {action: 'close', title: 'Close the notification'},
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});