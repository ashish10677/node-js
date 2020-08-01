const http = require('http');
const fs = require('fs');
const path = require('path');
const url = 'http://nodeprogram.com';

http.get(url, (response) => {
    fs.createWriteStream(path.join(__dirname, 'index.html'));
    let rawData = '';
    response.on('data', (chunk) => {
        rawData += chunk;
    })
    response.on('end', () => {
        fs.writeFileSync(path.join(__dirname, 'index.html'), rawData);
        console.log('response has ended')
    })
}).on('error', (error) => {
    console.log(error);
})