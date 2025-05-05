const User = require('../models/userModel');
const jwt=require('jsonwebtoken')

//creates a user and stores it in DB, create a token for authentication, returns the token and userId
//acts a a login but also creates a user.
const createUser = async (req, res) => {
    const { name } = req.body;
    try {
        const user = await User.create({ name });

         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {});
         user.token=token;
         user.save();

        return res.status(201).json({ token, userId: user._id });
    } catch (error) {
        return res.status(500).json({ error: error.message || 'Server error' });
    }
  };

  
  module.exports = { createUser };
