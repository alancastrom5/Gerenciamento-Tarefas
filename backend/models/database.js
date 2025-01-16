const mysql = require('mysql2');
require('dotenv').config({ path: './backend/.env' });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// como configurar o arquivo .env na pasta backend

 // DB_HOST=localhost
 // DB_PORT=000
 // DB_USER=root
 // DB_PASSWORD=usuario
 // DB_NAME=name_db

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.message);
    return;
  }
  console.log('Conectado ao banco de dados com sucesso!');
});

module.exports = connection;