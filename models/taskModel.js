
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth', //References the Auth model
    required: true,
  },
  deadline:{
    type:Date,

  },
  isCompleted:{
    type:Boolean,
    default:false,
  },
  collaborators:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
  }],
  reminderSent: { 
    type: Boolean, 
    default: false 
  }, 

});

module.exports = mongoose.model('Task', taskSchema);
