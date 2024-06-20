// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 8000;
const mongoDbUsername = process.env.MONGO_DB_USERNAME;
const mongoDbPassword = process.env.MONGO_DB_PASSWORD;

// Middleware to parse JSON
app.use(express.json());

// Configure CORS
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend's origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${mongoDbUsername}:${mongoDbPassword}@todoapp.mxtkezm.mongodb.net/`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Use routes
const tasksRouter = require('./routes/taskController');
const usersRouter = require('./routes/UserController');
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
