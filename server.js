const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Read secret from Key Vault mounted file
let dbPassword = "Not Found";

try {
    dbPassword = fs.readFileSync(
        '/mnt/secrets-store/db-password',
        'utf8'
    ).trim();

    console.log('Database Password:', dbPassword);
} catch (err) {
    console.log('Unable to read Key Vault secret:', err.message);
}

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

// Demo endpoint to verify Key Vault integration
app.get('/secret', (req, res) => {
    res.send(`Database Password: ${dbPassword}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});