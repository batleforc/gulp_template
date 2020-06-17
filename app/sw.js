importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

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
  clients.openWindow('/');
})
