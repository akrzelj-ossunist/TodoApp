// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: String,
    priority: String,
    status: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User schema
});

// Connect to the 'tasks' collection
const Task = mongoose.model('Task', taskSchema, 'tasks');

module.exports = Task;

