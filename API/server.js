const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);

app.use(
  cors({
    credentials: false,
  })
);
app.use(express.json());

app.use('/', (req, res) => {
  res.json('Hello');
});

const io = require('socket.io')(server);
io.origins(['http://localhost:8080']);
io.on('connection', (socket) => {
  console.log(`Socket conectado: ${socket.id}`);

  socket.on('sendOrder', (data) => {
    console.log(data);
  });
});

app.listen(3000, () => console.log('Running on port 3000'));
