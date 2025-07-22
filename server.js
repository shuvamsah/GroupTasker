const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task');
const User = require('./models/user');

const app = express();
app.use(express.json());

// --- Routes ---

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find().populate('assignee');
  res.json(tasks);
});

// Create a new task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

// Get a single task
app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id).populate('assignee');
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
});

// Update a task
app.patch('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const result = await Task.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).send('Task not found');
  res.status(204).send();
});

// Create user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// --- Start server only if not testing ---
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://mongo:27017/groupTasker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    app.listen(3000, () => {
      console.log('REST API running on http://localhost:3000');
    });
  }).catch(err => console.error(err));
}

// Export the app for testing
module.exports = app;
