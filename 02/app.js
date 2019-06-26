const express = require('express');

const app = express();
let storage = [];
app.get('/data', (req, res) => {
    for (key of storage) {
        res.write(key);
        res.send('That`s all!')
    };
});
app.post('/data', (req, res) => {
    req.on('data', (chunk) => {
        storage.push(chunk);
    });
    req.on('end', () => {
        res.send('Done!')
    });
})

app.listen(3000);
