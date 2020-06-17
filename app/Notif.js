const vapipublic="BOlh24I5TR7jPJJUNHT7UAG7oZr90fjAB8OGuPVvHhDC21VBfwypluguEysXpCuEK-paELmJFO1OXGM5raboQl8";
async function requestPermission(registration) {
   registration.pushManager.
   subscribe({
     userVisibleOnly: true,
     // The `urlBase64ToUint8Array()` function is the same as in
     // https://www.npmjs.com/package/web-pus#using-vapid-key-for-applicationserverkey
     applicationServerKey: urlBase64ToUint8Array(vapipublic)
   }).then((test)=>{
       console.log("Push notification subscribe");
       console.log('Sending push');
       fetch('http://localhost:5000/subscribe',{method: 'POST',
       body: JSON.stringify(test),
       headers: {
         'content-type': 'application/json'}})
         .then((test2)=>{
             console.log("Push send" + test2)
         })
   })
}
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
   
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
   
    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
function push(registration){
    if (('Notification' in window)) {
        Notification.requestPermission(status => {
            console.log('Notification permission status:', status);
            if((status)==="granted"){
                requestPermission(registration);
              }
          });
     }
     else
     {
        console.log('This browser does not support notifications!');
     }
}
function LocalNotification(){
   if(Notification.permission =='granted')
     navigator.serviceWorker.getRegistration().then(reg=>{
         const options = {
             body: 'First notification!',
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
       
           reg.showNotification('Hello world!', options);
     });
   }
