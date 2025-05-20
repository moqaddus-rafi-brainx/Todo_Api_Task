
const http=require('http');
const express = require('express');
require('dotenv').config(); 
const taskRoutes=require('./routes/taskRoutes');
const authRoutes=require('./routes/authRoutes');
const startTaskReminderCron=require('./cronJobs/reminderJob');
const connectDB=require('./config/db');
const {Server}=require('socket.io');
const cors=require('cors')

const app = express();
app.use(cors()); //Enable CORS for all routes
app.use(express.json());

const server=http.createServer(app)
const io=new Server(server,{
  cors: {
    origin: process.env.FRONT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

//keeping registered users
const connectedUsers = new Map();

io.on('connection', (socket) => {

  socket.on('register', (userId) => {
    connectedUsers.set(userId, socket.id);
  });

  socket.on('disconnect', () => {
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});

//calling cron
startTaskReminderCron(io, connectedUsers);

app.use('/api/tasks',taskRoutes);
app.use('/api/auth', authRoutes);
const port=process.env.PORT;

//Connect to MongoDB
connectDB();

//for using it elsewhere
app.set('io', io);
app.set('connectedUsers', connectedUsers);

server.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});

