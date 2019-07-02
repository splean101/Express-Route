/*Создайте сервер с тремя маршрутами:
1.	Маршрут "/" ведет на главную страницу.
2.	Маршрут "/about" ведет на страницу о сайте.
3.	Маршрут "/contact" ведет на страницу контакты.
Все маршруты работают по методу HTTP GET. Содержимое всех страниц произвольное.

Задание №2.
Создайте сервер с двумя маршрутами:
1.	Метод GET, маршрут "/data" – сервер возвращает информацию.
2.	Метод POST, маршрут "/data" – сервер добавляет информацию.
Хранилище информации на сервере реализуйте любым известным способом.

Задание №3.
Используя решения заданий №1 и №2, создайте сервер с двумя подмаршрутами.*/

const express = require('express');
const fs = require('fs');

const app = express();
let task1 = express.Router();
let task2 = express.Router();
task1.get('/', (req, res) => {
    fs.createReadStream('./main.html', 'utf8').on('data', (chunk) => {
        res.write(chunk)
        res.end();
    }).on('end', () =>{
        res.end();
    });
});
task1.get('/about', (req, res) => {
    fs.createReadStream('./about.html', 'utf8').on('data', (chunk) => {
        res.write(chunk)
        res.end();
    }).on('end', () =>{
        res.end();
    });
});
task1.get('/contact', (req, res) => {
    fs.createReadStream('./contact.html', 'utf8').on('data', (chunk) => {
        res.write(chunk)
        res.end();
    }).on('end', () =>{
        res.end();
    });
});

task2.get('/', (req, res) => {
   fs.createReadStream('./index.html', 'utf8').on('data', (chunk) => {
       res.write(chunk);
   }).on('end', () => res.end());
});

task2.get('/data', (req, res) => {
   fs.createReadStream('./storage.txt', 'utf8').on('data', (chunk) => {
       res.write(chunk);
   }).on('end', () => res.end('storage is  read'));
});

task2.post('/data', (req, res) => {
    req.on('data', (chunk) => {
        fs.appendFile('./storage.txt', chunk + ' ' + new Date().toDateString()  + '\n', 'utf8', (err) => {
            if (err) throw err;
        });
    });
    req.on('end', () => {
        res.redirect('/task2/data');
    });
});
app.use('/task1', task1);
app.use('/task2', task2);

app.listen(3000);