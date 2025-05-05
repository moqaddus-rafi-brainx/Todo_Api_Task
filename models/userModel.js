
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim:true,
  },
  email:{
    type:String,
    trim:true,
  }
});

//EMAIL VALIDATION
userSchema.pre('save', async function (next) {
  const User = mongoose.model('User');
  //return if its not modified(or added)
  if(!this.isModified('email'))
  {
    return next();
  }
  //Checking that email is not empty or just spaces
  if (this.email==undefined || this.email.trim() === '') {
    return next(new Error('Email cannot be empty'));
  }

  //Checking email syntax
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    return next(new Error('Invalid email format'));
  }

  //Checking if email already exists
  const existingUser = await User.findOne({ email: this.email });
  if (existingUser) {
    const err = new Error('Email already exists');
    err.status = 400;
    return next(err);
  }
  next();
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
