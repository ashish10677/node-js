const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017";
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log("ERROR", err);
        return process.exit();
    }
    let db = client.db('edx-course-db');
    console.log("Kudos, you're connected to the Mongo DB");
    insertDocuments(db).then((result) => {
        console.log('Inserted 3 documents into the edx-course-students collection')
        return updateDocument(db);
    }).then((res) => {
        console.log(`Updated the student document`);
        return removeDocument(db);
    }).then(() => {
        console.log(`Removed the document`);
        return findDocument(db);
    }).then((result) => {
        console.log("Records", result);
        client.close();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
})

const insertDocuments = (db) => {
    const collection = db.collection('edx-course-students');
    return collection.insertMany([{ name: 'Bob' }, { name: 'John' }, { name: "Alice" }]);
}

const updateDocument = (db) => {
    const collection = db.collection('edx-course-students');
    let name = 'Alice';
    return collection.updateOne({ name: name }, { $set: { grade: 'A' } });
}

const removeDocument = (db) => {
    const collection = db.collection('edx-course-students');
    let name = 'Alice';
    return collection.deleteMany({ name: { $in: ['Alice', 'Bob', 'John']} });
}

const findDocument = (db) => {
    const collection = db.collection('edx-course-students');
    return collection.find().toArray();
}