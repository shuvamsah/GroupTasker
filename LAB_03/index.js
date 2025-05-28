const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const tasks = [
  { id: 1, name: "Test Task 1", description: "First task description", status: "Open" },
  { id: 2, name: "Test Task 2", description: "Second task description", status: "Completed" }
];

app.get('/tasks', (req, res) => {
  res.render('task-list', {
    title: "Task List",
    tasks
  });
});

app.get('/create-task', (req, res) => {
  res.render('create-task', { title: "Create New Task" });
});

app.post('/create-task', (req, res) => {
  const { taskName, taskDesc } = req.body;

  const newTask = {
    id: tasks.length + 1,
    name: taskName,
    description: taskDesc,
    status: "Open"
  };

  tasks.push(newTask);
  res.redirect('/tasks');
});

app.get('/task-detail/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).send("Task not found");
  }

  res.render('task-detail', { title: "Task Detail", task });
});

app.get('/edit-task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).send("Task not found");
  }

  res.send(`Edit form for Task ID ${taskId} (not implemented yet)`);
});

app.get('/delete-task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).send("Task not found");
  }

  tasks.splice(index, 1);
  res.redirect('/tasks');
});

app.get('/', (req, res) => {
  res.redirect('/tasks');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
