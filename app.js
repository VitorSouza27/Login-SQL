const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Vitor',
    password: 'SENAI123',
    database: 'loginsql'
});


db.connect((error) => {
    if (error) {
        console.log("Erro ao contectar com o Banco de Dados")
    } else {
        console.log("Conectado ao MySQL")
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
    const user = req.body.user
    const password = req.body.password

    db.query('select password from User where user= ?', [user], (error, results) => {
        if (results.length > 0) {
            const passwordBD = results[0].password;
            if (passwordBD == password) {
                res.sendFile(__dirname + '/views/certo.html');
                console.log('Senha correta!');
            } else {
               res.sendFile(__dirname + '/views/errado.html');
                console.log('Senha incorreta!');
            };


        } else {
            console.log('Usuario não cadastrado!');
            res.sendFile(__dirname + '/views/errado.html');
            
        }
    })
});



app.listen(port, () => {
    console.log(`Servidor rodando no endereço: http://localhost:${port}`)
})
