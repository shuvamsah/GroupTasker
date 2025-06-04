import { useRouter } from 'next/router';
import { useTasks } from '../../context/TaskContext';
import { useState, useEffect } from 'react';

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const { getTask, updateTask } = useTasks();
  const task = getTask(Number(id));

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, { name, description });
    router.push('/task-detail/' + task.id);
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div style={{ background: '#fff', padding: '20px', maxWidth: '500px', margin: '2rem auto', borderRadius: '8px', boxShadow: '0 1px 5px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#ffc107', borderBottom: '2px solid #ffc107', paddingBottom: '8px' }}>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="taskName" style={{ fontWeight: 'bold' }}>Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          ></textarea>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#ffc107', color: 'black', border: 'none', cursor: 'pointer' }}>
            Save Changes
          </button>
          <button type="button" onClick={() => router.push('/task-detail/' + task.id)} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
