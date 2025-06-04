import { useRouter } from 'next/router';
import { useTasks } from '../../context/TaskContext';

export default function TaskDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { getTask, deleteTask } = useTasks();
  const task = getTask(Number(id));

  if (!task) return <p>Task not found</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h1 style={{ color: '#007bff', borderBottom: '2px solid #007bff', paddingBottom: '8px' }}>Task Detail</h1>
      <h2>{task.name}</h2>
      <p><strong>ID:</strong> {task.id}</p>
      <p><strong>Description:</strong> {task.description}</p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => router.push('/tasks')} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: '4px', border: 'none' }}>
          Back to Task List
        </button>
        <button onClick={() => router.push(`/edit-task/${task.id}`)} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#ffc107', color: 'black', borderRadius: '4px', border: 'none' }}>
          Edit Task
        </button>
        <button onClick={() => { deleteTask(task.id); router.push('/tasks'); }} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', borderRadius: '4px', border: 'none' }}>
          Delete Task
        </button>
      </div>
    </div>
  );
}
