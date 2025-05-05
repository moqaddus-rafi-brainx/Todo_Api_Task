
const express = require('express');
require('dotenv').config(); 
const userRoutes=require('./routes/userRoutes');
const taskRoutes=require('./routes/taskRoutes');
const connectDB=require('./config/db');
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks',taskRoutes);
const port=process.env.PORT;

//Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Server on http://localhost:${process.env.port}`);
});