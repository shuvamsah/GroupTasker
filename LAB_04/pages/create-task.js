import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTasks } from '../context/TaskContext';

export default function CreateTask() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTasks();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ name, description });
    router.push('/tasks');
  };

  return (
    <div style={{ background: '#fff', padding: '20px', maxWidth: '500px', margin: '2rem auto', borderRadius: '8px', boxShadow: '0 1px 5px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#007bff', borderBottom: '2px solid #007bff', paddingBottom: '8px' }}>Create New Task</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="taskName" style={{ fontWeight: 'bold' }}>Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter task name"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="taskDesc" style={{ fontWeight: 'bold' }}>Task Description:</label>
          <textarea
            id="taskDesc"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          ></textarea>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
            Create Task
          </button>
          <button type="button" onClick={() => router.push('/tasks')} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
