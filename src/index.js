const express = require('express');
const dotenv = require('dotenv'); //variables de entorno
const connection = require('./database/conexion'); //conexion
const crypto = require('crypto');
const path = require('path');



const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/register.html'));
})
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/dashboard.html'));
});

// Registrar
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

app.post('/register', async (req, res) => {
    const { email, name, username, password, card, balance } = req.body;
    try {
        let passwordHash = hashPassword(password);
        connection.query('INSERT INTO login (email, name, username, password, card, balance) VALUES (?, ?, ?, ?, ?, ?)', [email, name, username, passwordHash, card, balance], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ status: 'error', message: 'Hubo un error al registrarse. Por favor intente nuevamente.' });
            } else {
                console.log(results);
                res.status(200).json({ status: 'ok', message: 'Registro exitoso!' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Hubo un error en el servidor. Por favor intente nuevamente.' });
    }
});


// hash password without salt (NOT RECOMMENDED)
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);

    connection.query(`SELECT * FROM login WHERE username = '${username}' AND password = '${hashedPassword}'`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un error en el servidor. Por favor intente nuevamente.' });
        } else {
            if (results.length > 0) {
                res.status(200).json({ status: 'ok', message: 'Login exitoso!', username: username, results: results });
            } else {
                res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
            }
        }
    });
});


app.listen(process.env.PORT || 3000, (req, res) => {
    console.log("SERVER RUNNING http://localhost:3001/");
});

dotenv.config({ path: '.env' });