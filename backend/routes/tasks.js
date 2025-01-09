const express = require('express');
const connection = require('../models/database');
const router = express.Router();

// Recuperar todas as tarefas
exports.getAllTasks = (callback) => {
    connection.query("SELECT * FROM tasks", callback);
  };
  
  // Criar nova tarefa
  exports.createTask = (task, callback) => {
    const { title, description, status } = task;
    connection.query(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title, description, status],
      callback
    );
  };
  

    // Atualizar tarefa
    exports.updateTask = (id, task, callback) => {
        const { title, description, status } = task;
    
        // Garantir que o id é um número
        const taskId = parseInt(id);
        if (isNaN(taskId)) {
        return callback(new Error("ID inválido"));
        }
    
        connection.query(
        "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
        [title, description, status, taskId],
        callback
        );
    };
  
  // Excluir tarefa
  exports.deleteTask = (id, callback) => {
    connection.query("DELETE FROM tasks WHERE id = ?", [id], callback);
  };

module.exports = router;
