const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',        
  port: 3306,               
  user: 'root',
  password: 'alan2468',
  database: 'gerenciamento_tarefas',
});

// Verifica a conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro de conexão ao MySQL: ' + err.message);
    return;
  }
  console.log('Conectado ao banco de dados com ID ' + connection.threadId);
});

module.exports = connection;
