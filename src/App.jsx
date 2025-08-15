import { useEffect, useState } from "react";
import AddTasks from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // async function fetchTasks() {
    //   // Chamada para a API
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/todos?_limit=10",
    //     { method: "GET" }
    //   );
    //   //pegar os dados que ela retorna
    //   const data = await response.json();
    //   // console.log(data);
    //   // Armazenar esses dados no estado
    //   setTasks(data);
    // }
    // fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTask = tasks.map((task) => {
      //PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      //NÃO PRECISA ATUALIZAR A TAREFA
      return task;
    });
    setTasks(newTask);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(), //gerar um id único
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen  h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Minhas Tarefas</Title>

        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
