const mongodb = require('mongodb');
const customerAddress = require('./m3-customer-address-data.json');
const customerData = require('./m3-customer-data.json');
const datasetSize = customerAddress.length;

const url = 'mongodb://127.0.0.1:27017';
let dbClient;

const insertDataIntoDatabase = (db, loopDivision = 100, recordsLeft, startIndex = 0) => {
    if (recordsLeft <= 0) {
        dbClient.close();
        return;
    }
    let insertPromise = [];
    for (let i = startIndex; i < startIndex + loopDivision; i++) {
        insertPromise.push(db.collection('customertestdata').insertOne({ ...customerData[i], ...customerAddress[i] }))
    }
    Promise.all(insertPromise).then((res) => {
        recordsLeft -= loopDivision;
        console.log("Records left", recordsLeft);
        return insertDataIntoDatabase(db, loopDivision, recordsLeft, loopDivision);
    }).catch((err) => {
        return Promise.reject(err);
    })
}
mongodb.MongoClient.connect(url, { useUnifiedTopology: true }).then((client) => {
    dbClient = client;
    let db = client.db('edx-course-db');
    let loopDivision = process.argv[2];
    return insertDataIntoDatabase(db, loopDivision, datasetSize);
}).catch(err => {
    console.log(err);
})