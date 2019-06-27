const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    fs.createReadStream('./index.html', 'utf8').on('data', (chunk) => {
        res.write(chunk);
    }).on('end', () => res.end());
});

app.get('/data', (req, res) => {
    fs.createReadStream('./storage.txt', 'utf8').on('data', (chunk) => {
        res.write(chunk);
    }).on('end', () => res.end('storage is  read'));
});

app.post('/data', (req, res) => {
    req.on('data', (chunk) => {
        fs.appendFile('./storage.txt', chunk + '\n', 'utf8', (err) => {
            if (err) throw err;
        });
    });
    req.on('end', () => {
        res.redirect('/');
    });
});

app.listen(3000);
