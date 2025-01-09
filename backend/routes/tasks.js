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
    const updateTask = () => {
        console.log('Atualizando tarefa com os seguintes dados:', editingTask);
        axios.put(`http://localhost:3001/tasks/${editingTask.id}`, editingTask)
        .then(() => {
            // Criar uma nova lista de tarefas, substituindo a tarefa atualizada
            const updatedTasks = tasks.map(task => 
            task.id === editingTask.id ? { ...task, ...editingTask } : task
            );
            setTasks(updatedTasks); // Atualiza o estado com a nova lista de tarefas
            setEditingTask(null);
            setNewTask({ title: "", description: "", status: "pendente" });
        })
        .catch((error) => {
            console.error("Erro ao atualizar tarefa:", error);
        });
    };
  
  // Excluir tarefa
  exports.deleteTask = (id, callback) => {
    connection.query("DELETE FROM tasks WHERE id = ?", [id], callback);
  };

module.exports = router;
