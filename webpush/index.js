const webpush = require('web-push');
const express = require('express');
const app = express();
const http = require(`http`).createServer(app);
 
const port = process.env.PORT || 5000;
var test={
    endpoint: 'https://fcm.googleapis.com/fcm/send/eRiR0_2zoBs:APA91bG1So1zvIlM6nV5HogtMrI-g0oCWqFApsQxO0b0pWt3b_G1_1oPBtTDns_StUhlXrQLuAMSC3aSBdAjRLaZL9TkGIdIZEZhfx7WvCwJiYnrFku6YwATsGPV-P429xX3CUtdCwQi',
    expirationTime: null,
    keys: {
      p256dh: 'BErEtn2a4y0VhXk_Soe43SZ0kUcTe8rkTHZXvaL7IC3SmUnscArKO3IbG20DtyBsGgVv3W5ZkLied7SaWD9QHPM',
      auth: '7W6d-LxiBHF7vRJUi3Cpig'
    }
  };
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json());
 
webpush.setGCMAPIKey('AAAAKfLx5bw:APA91bHDv2yxoFf8YpH-sD6TtBfXJsDyoO3kf8mHVDEt9gfYMfjIbqD0R-zY3mRGZwe-LtYNlcFlDVzffirVhgE0z5tWAiylwHjcxJuSqOxZ9I0z9v-OxwbWkYvaCllU6GRm9O6JgwPk');
webpush.setVapidDetails(
  'mailto:maxime.lerichepro@gmail.com',
  "BOlh24I5TR7jPJJUNHT7UAG7oZr90fjAB8OGuPVvHhDC21VBfwypluguEysXpCuEK-paELmJFO1OXGM5raboQl8",
  "SFwya9cIk3PX_1tPBZ_KAk1XJSmGewOJX1xG3iDB6ho"
);
 
app.post('/subscribe',(req,res)=>{
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({title:"test"});
    console.log(subscription);
    test=subscription;
    webpush.sendNotification(subscription,payload).catch(error=>{
        console.error(error.stack)
    });
})
app.get('/',(req,res)=>{
    res.status(200).send("Index.JS Template API")
})
app.get('/notif',(req,res)=>{
    const payload = JSON.stringify({title:"test"});
    webpush.sendNotification(test,payload).catch(error=>{
        console.error(error.stack)
    });
    return res.status(200).send("Send")
})

http.listen(port);
console.log("app is listening on port "+ port)