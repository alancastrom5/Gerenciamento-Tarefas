const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./models/database');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas

// 1. Criar uma nova tarefa
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  const sql = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
  connection.query(sql, [title, description, status], (err, result) => {
    if (err) {
      console.error('Erro ao criar tarefa:', err.message);
      res.status(500).json({ error: 'Erro ao criar tarefa' });
    } else {
      res.status(201).json({ id: result.insertId, title, description, status });
    }
  });
});

// 2. Listar todas as tarefas
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar tarefas:', err.message);
      res.status(500).json({ error: 'Erro ao listar tarefas' });
    } else {
      res.status(200).json(results);
    }
  });
});

// 3. Atualizar uma tarefa
app.put('/tasks/:id', (req, res) => {
    console.log('Recebido para atualizar tarefa:', req.body);
    const { id } = req.params;
    const { title, description, status } = req.body;
    const sql = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
    connection.query(sql, [title, description, status, id], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar tarefa:', err.message);
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
      } else {
        res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
      }
    });
  });
  

// 4. Excluir uma tarefa
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir tarefa:', err.message);
      res.status(500).json({ error: 'Erro ao excluir tarefa' });
    } else {
      res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    }
  });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
