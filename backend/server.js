const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./models/database");
const tasksModel = require("./models/tasks");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Listar todas as tarefas
app.get("/tasks", (req, res) => {
  tasksModel.getAllTasks((err, results) => {
    if (err) {
      console.error("Erro ao listar tarefas:", err);
      res.status(500).send("Erro ao listar tarefas");
    } else {
      res.json(results);
    }
  });
});

// Criar nova tarefa
app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;
  tasksModel.createTask({ title, description, status }, (err, result) => {
    if (err) {
      console.error("Erro ao criar tarefa:", err);
      res.status(500).send("Erro ao criar tarefa");
    } else {
      res.status(201).send("Tarefa criada com sucesso!");
    }
  });
});

// Atualizar tarefa
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  tasksModel.updateTask(id, { title, description, status }, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar tarefa:", err);
      res.status(500).send("Erro ao atualizar tarefa");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Tarefa não encontrada");
    } else {
      res.send("Tarefa atualizada com sucesso!");
    }
  });
});

// Excluir tarefa
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasksModel.deleteTask(id, (err, result) => {
    if (err) {
      console.error("Erro ao excluir tarefa:", err);
      res.status(500).send("Erro ao excluir tarefa");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Tarefa não encontrada");
    } else {
      res.send("Tarefa excluída com sucesso!");
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
