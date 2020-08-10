const schema = require('../database/BookSchema');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/edxcoursedb';

const getAllAccounts = (req, res) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    schema.find().then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(400).send(JSON.stringify(err));
    }).finally(() => {
        mongoose.disconnect();
    })
}

const addAccount = (req, res) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const account = new schema(req.body);
    account.save().then((response) => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(400).send(JSON.stringify(err));
    }).finally(() => {
        mongoose.disconnect();
    })
}

const updateAccount = (req, res) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    schema.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((response) => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(400).send(JSON.stringify(err));
    }).finally(() => {
        mongoose.disconnect();
    })
}

const deleteAccount = (req, res) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    schema.findByIdAndDelete(req.params.id).then((response) => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(400).send(JSON.stringify(err));
    }).finally(() => {
        mongoose.disconnect();
    })
}

module.exports = {
    getAllAccounts,
    addAccount,
    updateAccount,
    deleteAccount
}