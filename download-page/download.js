const http = require("http");
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

const downloadPage = (url = 'http://nodeprogram.com') => {
    const folderName = uuidv1();
    fs.mkdirSync(folderName);
    fetchUrl(url, (error, data) => {
        if (error)
            return console.error(error);
        fs.writeFileSync(path.join(__dirname, folderName, 'index.html'), data);
        fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url);
        console.log("Data scraped successfully in folder:", folderName);
    })
}

const fetchUrl = (url, callback) => {
    console.log('Downloading from', url)
    http.get(url, (res) => {
        let buffer = '';
        res.on('data', (chunk) => {
            buffer += chunk;
        })

        res.on('end', () => {
            callback(null, buffer)
        })

    }).on('error', (err) => {
        callback(err);
    })
}

downloadPage(process.argv[2]);