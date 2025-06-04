import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Test Task 1", description: "First task description", status: "Open" },
    { id: 2, name: "Test Task 2", description: "Second task description", status: "Completed" }
  ]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1, status: "Open" }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const getTask = (id) => tasks.find(task => task.id === id);

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask, getTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
