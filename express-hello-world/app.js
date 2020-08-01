const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

var profile = {
    name: 'Ashish Kumar Mishra',
    email: 'ashish10677@gmail.com',
    address: 'Bangalore/Jamshedpur'
}

app.get('/', (req, res) => {
    res.send(profile);
});

app.get('/search', (req, res) => {
    console.log(req.query);
    res.send(profile);
});

app.post('/profile', (req, res) => {
    profile = req.body;
    res.sendStatus(201);
})

app.put('/profile', (req, res) => {
    Object.assign(profile, req.body);
    res.sendStatus(204);
})

app.delete('/profile', (req, res) => {
    profile = {};
    res.sendStatus(204)
})

app.listen(3000);