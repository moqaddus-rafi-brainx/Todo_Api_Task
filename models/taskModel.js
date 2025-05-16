
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
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

//ISCOMPLETED VALIDATION
taskSchema.pre('save', async function (next) {
  if(!this.isModified('isCompleted'))
  {
    return next();
  }
  if(typeof this.isCompleted !== 'boolean')
    {
      return next(new Error('isCompleted is Non Boolean'));
    }

})


//DESCRIPTION VALIDATION
taskSchema.pre('save', async function (next) {
  if(!this.isModified('description'))
  {
    return next();
  }
  //Checking that description is not empty or just spaces
  if (this.description.trim() === '') {
    return next(new Error('Description cannot be empty'));
  }
  if(typeof this.description !== 'string')
  {
    return next(new Error('Description should be a string'));
  }

  //Checking if the description is too long
  if(this.description.length>30)
  {
    return next(new Error('Task Description too long'));
  }
})

module.exports = mongoose.model('Task', taskSchema);
