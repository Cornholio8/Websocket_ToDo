const express = require('express');

const app = express();

const socket = require('socket.io');
const tasks = [];

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client ID:', socket.id);
    socket.emit('updateData', tasks);
    socket.on('addTask', (task) => {
      console.log('Task succesfully added');
      tasks.push(task);
      socket.broadcast.emit('addTask', task);
    });
    socket.on('removeTask', (task) => {
      tasks.splice(tasks.indexOf(task), 1);
      socket.broadcast.emit('removeTask', task);
    });
  });