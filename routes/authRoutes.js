const express = require('express');
const router = express.Router();

const { signupUser, loginUser,verifyUser,changePassword,forgotPassword,resetPassword } = require('../controllers/authController');
const {authenticate}=require('../middleware/authMiddleware');


router.post('/signup', signupUser);
router.get('/verify',verifyUser);
router.post('/login', loginUser);
router.patch('/change-password',authenticate,changePassword);
router.post('/forgot-password',forgotPassword);
router.patch('/reset-password',resetPassword);

module.exports = router;

