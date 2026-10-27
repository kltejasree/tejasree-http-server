const http = require('node:http');
const crypto = require('node:crypto');

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.end(`<!DOCTYPE html>
                <html>
                <head>
                </head>
                <body>
                    <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
                    <p> - Martin Fowler</p>
                </body>
                </html>
            `);
    }

    else if (req.method === 'GET' && req.url === '/json') {
        const data = {
            slideshow: {
                author: 'Yours Truly',
                date: 'date of publication',
                slides: [
                    {
                        title: 'Wake up to WonderWidgets!',
                        type: 'all'
                    },
                    {
                        items: [
                            'Why <em>WonderWidgets</em> are great',
                            'Who <em>buys</em> WonderWidgets'
                        ],
                        title: 'Overview',
                        type: 'all'
                    }
                ],
                title: 'Sample Slide Show'
            }
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data, null, 2));
    }

    else if (req.method === 'GET' && req.url === '/uuid') {
        const data = {
            uuid: crypto.randomUUID()
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data, null, 2));
    }

    else if (req.method === 'GET' && req.url.startsWith('/status/')) {
        const statusCode = parseInt(req.url.split('/')[2]);

        if (statusCode === 100) {
            res.writeContinue();
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Response with status code ${statusCode}`);
        }

        else if (statusCode >= 200 && statusCode <= 599) {
            res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
            res.end(`Response with status code ${statusCode}`);
        }

        else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid status code');
        }
    }

    else if (req.method === 'GET' && req.url.startsWith('/delay/')) {
        const delaySeconds = parseInt(req.url.split('/')[2]);

        setTimeout(() => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Responded after ${delaySeconds} seconds`);
        }, delaySeconds * 1000);
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('NOT FOUND');
    }

});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
    