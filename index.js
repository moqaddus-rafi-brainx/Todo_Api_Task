
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const userRoutes=require('./routes/userRoutes');
const taskRoutes=require('./routes/taskRoutes');
const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/task',taskRoutes);
const port=process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB via Mongoose'))
.catch(err => console.error('❌ MongoDB connection error:', err));


app.listen(port, () => {
  console.log(`Server on http://localhost:${process.env.port}`);
});