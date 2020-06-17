if (('Notification' in window)) {
    Notification.requestPermission(status => {
        console.log('Notification permission status:', status);
      });
}
else
{
    console.log('This browser does not support notifications!');
}
function LocalNofitification(){
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
