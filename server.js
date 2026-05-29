const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/rooms', (req, res) => {
    res.render('rooms');
});

app.get('/booking', (req, res) => {
    res.render('booking');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});