
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //References the User model
    required: true,
  },
});

module.exports = mongoose.model('Task', taskSchema);
