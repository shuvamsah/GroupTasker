// __tests__/api.test.js

jest.setTimeout(15000); // ⏱ Step 3.1: Increase Jest timeout

const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/task');   // ✅ Step 3.2: Correct import paths
const User = require('../models/user');

const app = express();
app.use(express.json());

// Basic routes for testing
app.post('/users', async (req, res) => {
  const user = await new User(req.body).save();
  res.status(201).json(user);
});

app.post('/tasks', async (req, res) => {
  const task = await new Task(req.body).save();
  res.status(201).json(task);
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/group-tasker-test'); // ✅ Step 3.3: Use simple connection
});

afterEach(async () => {
  await Task.deleteMany();
  await User.deleteMany();
});

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {  // ✅ Step 3.4: Safe dropDatabase
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.disconnect();
});

describe('REST API Tests', () => {
  it('POST /tasks - should create a task', async () => {
    const user = await new User({ name: 'Test User', role: 'member' }).save();

    const res = await request(app).post('/tasks').send({
      title: 'API Task',
      description: 'Created via test',
      status: 'open',
      assignee: user._id
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('API Task');
  });

  it('GET /tasks - should return all tasks', async () => {
    await new Task({ title: 'Sample Task', status: 'open' }).save();

    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});