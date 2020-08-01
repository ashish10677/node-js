const initDatabase = require('../init-db');
const mongodb = require('mongodb')

const getAllAccounts = (req, res) => {
    let databaseClient;
    initDatabase.getDatabaseClient().then((client) => {
        databaseClient = client;
        let db = databaseClient.db('edx-course-db');
        return db.collection('accounts').find().toArray();
    }).then((dataArray) => {
        res.status(200).send(dataArray);
    }).catch((err) => {
        res.status(400).send(JSON.stringify(err));
    }).finally(() => {
        if (databaseClient) {
            databaseClient.close();
        }
    })
}

const addAccount = (req, res) => {
    let databaseClient;
    initDatabase.getDatabaseClient().then((client) => {
        databaseClient = client;
        let db = databaseClient.db('edx-course-db');
        return db.collection('accounts').insertOne(req.body);
    }).then((results) => {
        res.status(200).send(results);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(JSON.stringify(error));
    }).finally(() => {
        if (databaseClient) {
            databaseClient.close();
        }
    })
}

const editAccount = (req, res) => {
    let databaseClient;
    initDatabase.getDatabaseClient().then((client) => {
        databaseClient = client;
        let db = databaseClient.db('edx-course-db');
        return db.collection('accounts').updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: req.body });
    }).then((results) => {
        res.status(200).send(results);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(JSON.stringify(error));
    }).finally(() => {
        if (databaseClient) {
            databaseClient.close();
        }
    })
}

const deleteAccount = (req, res) => {
    let databaseClient;
    initDatabase.getDatabaseClient().then((client) => {
        databaseClient = client;
        let db = databaseClient.db('edx-course-db');
        return db.collection('accounts').deleteOne({ _id: mongodb.ObjectID(req.params.id) });
    }).then((results) => {
        res.status(200).send(results);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(JSON.stringify(error));
    }).finally(() => {
        if (databaseClient) {
            databaseClient.close();
        }
    })
}


module.exports = {
    getAllAccounts,
    addAccount,
    editAccount,
    deleteAccount
}