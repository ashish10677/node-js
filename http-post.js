const http = require('http');

var data = JSON.stringify({
    foo: 'bar'
})

const options = {
    "method": "POST",
    "hostname": "mockbin.com",
    "port": 80,
    "path": "/request?foo=bar&foo=baz",
    "headers": {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
}

const req = http.request(options, (res) => {
    res.on('data', (chunk) => {
        console.log(chunk.toString('utf8'));
    });

    res.on('end', () => {
        console.log('No more data in the response');
    });

})

req.on('error', (err) => {
    console.log(`ERROR ${err}`);
})

req.write(data);
req.end();