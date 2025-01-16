const connection = require('./database');

const createTasksTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status ENUM('pendente', 'concluído') NOT NULL DEFAULT 'pendente'
    );
  `;

  connection.query(query, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela tasks: ' + err.stack);
    } else {
      console.log('Tabela tasks criada ou já existe.');
    }
  });
};

createTasksTable();
