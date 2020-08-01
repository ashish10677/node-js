const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const accounts = require('./routes/accounts');

const app = express();
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/accounts', accounts.getAllAccounts);

app.post('/accounts', accounts.addAccount);

app.put('/accounts/:id', accounts.editAccount);

app.delete('/accounts/:id', accounts.deleteAccount);

app.use(errorhandler());
app.listen(3000)