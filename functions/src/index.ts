import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
const express = require('express');
const app = express();

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
// exports.date = functions.https.onRequest((req, res) => res.status(200).json({ date: new Date() }));

const corsHandler = cors({
    origin: [
      'http://localhost:4200',
      'https://danils123.github.io/spaceTravel/'
    ],
});

// Automatically allow cross-origin requests
app.use(corsHandler);


// build multiple CRUD interfaces:
app.post('/', (req: functions.Request, res: functions.Response) => {
    db.collection('constants').doc('countUsers').get()
    .then((snapshot) => {
        res.status(200).send(snapshot.get("value"));
    })
    .catch((err) => {
        console.log('Error getting documents', err);
      });
});

// Expose Express API as a single Cloud Function:
exports.createUser = functions.https.onRequest(app);



// exports.createUser = functions.https.onRequest((req: functions.Request, res: functions.Response) => {
//     // res.set('Access-Control-Allow-Origin', '*');
//     // res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
//     // res.set('Access-Control-Allow-Headers', '*');

//     // @ts-ignore
//     // tslint:disable-next-line:no-empty
//     corsHandler(req, res, () => {
//         res.status(200).send( { id: 1});
//     });
//     // const name = req.body.name;
//     // if (req.method === 'OPTIONS') {
//     //     res.end();
//     // } else {
//     //     const name = req.body.name;
//     //     res.status(200).send( {name: name, id: 1});
//     // }
// });
