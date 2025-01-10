import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "pendente" });
  const [editingTask, setEditingTask] = useState(null);

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

  // Atualizar tarefa
  const updateTask = () => {
    // Log para depuração dos dados antes de enviar
    console.log('Atualizando tarefa com os seguintes dados:', newTask);
    
    // Verificação para garantir que a tarefa tenha um id válido
    if (!editingTask || !editingTask.id) {
      console.error("Erro: A tarefa não tem um id válido.");
      return;
    }
    
    const updatedTask = {
      id: editingTask.id,
      title: newTask.title, 
      description: newTask.description,
      status: newTask.status
    };

    axios.put(`http://localhost:3001/tasks/${updatedTask.id}`, updatedTask)
      .then(() => {
        // Atualiza a lista de tarefas com a tarefa modificada
        setTasks(tasks.map(task => 
          task.id === updatedTask.id ? { ...task, title: updatedTask.title, description: updatedTask.description, status: updatedTask.status } : task
        ));
        setEditingTask(null);
        setNewTask({ title: "", description: "", status: "pendente" });
      })
      .catch((error) => {
        console.error("Erro ao atualizar tarefa:", error);
      });
  };

  // Excluir tarefa
  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch((error) => {
        console.error("Erro ao excluir tarefa:", error);
      });
  };

  // Função para iniciar a edição de uma tarefa
  const startEditing = (task) => {
    console.log('Iniciando edição da tarefa:', task);
    if (!task.id) {
      console.error('Erro: A tarefa não tem id.');
      return;
    }
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description, status: task.status });
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Tarefas</h1>

      {/* Lista de tarefas */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => startEditing(task)}>Editar</button>
            <button onClick={() => deleteTask(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      {/* Formulário para criar ou editar tarefas */}
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
      <button onClick={editingTask ? updateTask : createTask}>
        {editingTask ? "Atualizar Tarefa" : "Adicionar Tarefa"}
      </button>
    </div>
  );
}

export default App;
