const mongodb= require('mongodb')

const url = 'mongodb://127.0.0.1:27017';

const getDatabaseClient = () => {
    return mongodb.MongoClient.connect(url, { useUnifiedTopology: true }).then((client) => {
        return client;
    }).catch((error) => {
        return Promise.reject(error);
    })
}

module.exports = { getDatabaseClient };