import Link from 'next/link';
import { useTasks } from '../context/TaskContext';

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#007bff', borderBottom: '2px solid #007bff', paddingBottom: '8px' }}>Task List</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
            <strong>{task.name}</strong> – Status: {task.status}<br/>
            <Link href={`/task-detail/${task.id}`}>
              <a style={{ marginTop: '5px', display: 'inline-block', padding: '6px 12px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                View Details
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/create-task">
        <a style={{ display: 'inline-block', marginTop: '20px', padding: '10px 15px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Create New Task
        </a>
      </Link>
    </div>
  );
}
