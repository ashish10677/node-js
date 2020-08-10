const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const accounts = require('./routes/accounts');

const app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorHandler());

app.get('/accounts', accounts.getAllAccounts);

app.post('/accounts', accounts.addAccount);

app.put('/accounts/:id', accounts.updateAccount);

app.delete('/accounts/:id', accounts.deleteAccount);

app.listen(3000);