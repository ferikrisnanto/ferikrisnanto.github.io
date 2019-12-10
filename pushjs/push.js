var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BPxAF5lDhVPFELwXcvAMbr7pLxrDSfJ1hfEWpBf8rNgwvt1eOIDLTFRgyt9TzsWcuYFkafuUr5NJISVGzjtj-Eg",
   "privateKey": "-swFGYQyZMb9wGDHTfu3JINW8pyJ66iG3jf36he3NyQ"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/epLgW4SbZYE:APA91bEVujEPIsmAV_UMWAkpxwaL3Ld38VU2xqDB2XZvqlsgckg30-FgQPoQGrSjdqRlkd4XGqYbRQHYL-LWCwnjpZImUhkS6JnPzv4DrBzBPmZw8BRA5JKi7Xxte_hKWVVMB9Tg_ak4",
   "keys": {
       "p256dh": "BF2xTkqtIMLpqddlLzj4f7Y2am+bh1/2FYDxQ2vv0pUesiZiL/wncHVdd51sPRVmNCWF9/W4V7/kYO0p9vFRaK0=",
       "auth": "ChbLO3UGqlkL6HbEc2Vm5Q=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '736663332357',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);