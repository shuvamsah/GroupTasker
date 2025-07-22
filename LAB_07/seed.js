const mongoose = require('mongoose');
const User = require('./models/user');
const Task = require('./models/task');

mongoose.connect('mongodb://localhost:27017/group-tasker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Connection error:", err));

async function seed() {
  await User.deleteMany({});
  await Task.deleteMany({});

  const anna = await User.create({ name: 'Anna', role: 'member' });
  const liam = await User.create({ name: 'Liam', role: 'lead' });

  const task = await Task.create({
    title: 'Fix Landing Page',
    description: 'Update button colors',
    status: 'open',
    assignee: anna._id,
    comments: [
      { content: 'Will do this tomorrow', timestamp: new Date() }
    ]
  });

  console.log("Database seeded successfully");
  mongoose.disconnect();
}

seed();
