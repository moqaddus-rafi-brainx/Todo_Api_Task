
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const userRoutes=require('./routes/userRoutes');
const taskRoutes=require('./routes/taskRoutes');
const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/task',taskRoutes);

//Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');

  //Start server only after successful DB connection
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
