import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

// Definição dos tipos
interface Task {
  id: number;
  title: string;
  description: string;
  status: "pendente" | "concluído";
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({ title: "", description: "", status: "pendente" });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Buscar tarefas do backend
  useEffect(() => {
    axios.get<Task[]>("http://localhost:3001/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefas:", error);
      });
  }, []);

  // Criar uma nova tarefa
  const createTask = () => {
    axios.post<Task>("http://localhost:3001/tasks", newTask)
      .then((response) => {
        setTasks([...tasks, { ...response.data }]);
        setNewTask({ title: "", description: "", status: "pendente" });
      })
      .catch((error) => {
        console.error("Erro ao criar tarefa:", error);
      });
  };

  // Atualizar tarefa
  const updateTask = () => {
    if (!editingTask) {
      console.error("Erro: A tarefa não está sendo editada.");
      return;
    }

    const updatedTask: Task = {
      ...editingTask,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
    };

    axios.put(`http://localhost:3001/tasks/${updatedTask.id}`, updatedTask)
      .then(() => {
        setTasks(tasks.map(task =>
          task.id === updatedTask.id
            ? updatedTask
            : task
        ));
        setEditingTask(null);
        setNewTask({ title: "", description: "", status: "pendente" });
      })
      .catch((error) => {
        console.error("Erro ao atualizar tarefa:", error);
      });
  };

  // Atualizar status da tarefa (concluído/pendente)
  const toggleStatus = (task: Task) => {
    const updatedTask: Task = {
      ...task,
      status: task.status === "pendente" ? "concluído" : "pendente",
    };
  
    axios.put(`http://localhost:3001/tasks/${task.id}`, updatedTask)
      .then(() => {
        setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
      })
      .catch((error) => {
        console.error("Erro ao atualizar status da tarefa:", error);
      });
  };
  

  // Excluir tarefa
  const deleteTask = (id: number) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch((error) => {
        console.error("Erro ao excluir tarefa:", error);
      });
  };

  // Iniciar edição da tarefa
  const startEditing = (task: Task) => {
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
            <strong>{task.title}</strong> - {task.status}
            <button onClick={() => toggleStatus(task)}>
              {task.status === "pendente" ? "Concluir" : "Reabrir"}
            </button>
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
};

export default App;
