
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim:true,
  },
  token: {
    type: String,
    required: false,
  },
});

//NAME VALIDATION
userSchema.pre('save', async function (next) {
  if(!this.isModified('name'))
  {
    return next();
  }

  //Checking that username is not empty or just spaces
  if (this.name.trim() === '') {
    return next(new Error('name cannot be empty'));
  }
})

module.exports = mongoose.model('User', userSchema);
