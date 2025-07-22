// __tests__/task.test.js

jest.setTimeout(15000); // ⏱ Step 2.1: Increase Jest timeout to 15 seconds

const mongoose = require('mongoose');
const Task = require('../models/task'); // ✅ Step 2.2: Correct the import path

describe('Task Model Unit Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/group-tasker-test'); // ✅ Step 2.3: Simplify connection (no options needed)
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {  // ✅ Step 2.4: Check if DB is ready before dropping
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
  });

  it('should create & save a task successfully', async () => {
    const task = new Task({
      title: 'Test Task',
      description: 'This is only a test',
      status: 'open',
      comments: []
    });

    const savedTask = await task.save();
    expect(savedTask._id).toBeDefined();
    expect(savedTask.title).toBe('Test Task');
  });
});