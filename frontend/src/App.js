import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "pendente" });

  // Buscar tarefas do backend
  useEffect(() => {
    axios.get("http://localhost:3001/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefas:", error);
      });
  }, []);

  // Criar uma nova tarefa
  const createTask = () => {
    axios.post("http://localhost:3001/tasks", newTask)
      .then(() => {
        setTasks([...tasks, newTask]);
        setNewTask({ title: "", description: "", status: "pendente" });
      })
      .catch((error) => {
        console.error("Erro ao criar tarefa:", error);
      });
  };

  return (
    <div>
      <h1>Gerenciamento de Tarefas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Título"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <textarea
        placeholder="Descrição"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <button onClick={createTask}>Adicionar Tarefa</button>
    </div>
  );
}

export default App;
