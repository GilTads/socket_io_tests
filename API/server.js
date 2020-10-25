const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(3000, function () {
  console.log('server running on port 3000');
});

app.use('/', (req, res) => {
  res.json('Hello');
});

let messages = [];

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log(`Socket conectado: ${socket.id}`);

  socket.on('disconect', () => console.log(`${socket.id} disconected`));

  socket.emit('previuosMessages', messages);

  socket.on('sendOrder', (data) => {
    console.log(data);
    messages.push(data);
    socket.broadcast.emit('receivedOrder', data);
  });
});
