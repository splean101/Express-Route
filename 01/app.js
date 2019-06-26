/*Создайте сервер с тремя маршрутами:
1.	Маршрут "/" ведет на главную страницу.
2.	Маршрут "/about" ведет на страницу о сайте.
3.	Маршрут "/contact" ведет на страницу контакты.
Все маршруты работают по методу HTTP GET. Содержимое всех страниц произвольное.*/

const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    fs.createReadStream('./main.html', 'utf8').on('data', (chunk) => {
        res.write(chunk)
        res.end();
    }).on('end', () =>{
        res.end();
    });
});
app.get('/about', (req, res) => {
    fs.createReadStream('./about.html', 'utf8').on('data', (chunk) => {
        res.write(chunk)
        res.end();
    }).on('end', () =>{
        res.end();
    });
});
app.get('/contact', (req, res) => {
    fs.createReadStream('./contact.html', 'utf8').on('data', (chunk) => {
        res.write(chunk)
        res.end();
    }).on('end', () =>{
        res.end();
    });
});
app.listen(3000);
