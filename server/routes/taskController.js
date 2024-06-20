const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('user');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const { task, priority, status, userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newTask = new Task({
            task,
            priority,
            status,
            user: user._id
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all tasks for a specific user
router.get('/user/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
        const tasks = await Task.find({ user: uid }).populate('user');
        if (!tasks) {
            return res.status(404).json({ message: 'No tasks found for this user' });
        }
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.findByIdAndDelete(id); // Use findByIdAndDelete instead of findByIdAndRemove
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update task status by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.status = status;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
