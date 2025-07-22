const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ content: String, timestamp: Date }]
});

module.exports = mongoose.model('Task', taskSchema);
