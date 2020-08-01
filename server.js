const http = require('http');
const port = 3000;

http.createServer((req, res) => {
    if (req.method === "POST") {
        let buf = '';
        req.on('data', (chunk) => {
            buf += chunk;
        })

        req.on('end', () => {
            console.log(`${buf}`);
            res.end('Accepted Body')
        })
    } else {
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });
        res.end('Hello World');
    }
}).listen(port)