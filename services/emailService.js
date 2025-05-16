const nodemailer = require('nodemailer');
require('dotenv').config();
const Password=process.env.PASSWORD;

// Email transporter config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rafimoqaddus@gmail.com',
      pass: Password, //generated for this app.
    },
  });


async function sendVerificationEmail(to, verificationLink) {
  try {
    const info = await transporter.sendMail({
      from: 'rafimoqaddus@gmail.com',
      to,
      subject: 'Email Verification',
      html: `<p>Click on this link to verify your email:</p><a href="${verificationLink}">Verify Email</a>`,
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}


async function sendPasswordResetEmail(to, resetLink) {
    try {
      const info = await transporter.sendMail({
        from: 'rafimoqaddus@gmail.com',
        to,
        subject: 'Reset Password',
        html: `<p>Click on this link to reset you password:</p><a href="${resetLink}">Verify Email</a>`,    
    });
      console.log('Email sent:', info.messageId);
      return info;
    } catch (err) {
      console.error('Error sending email:', err);
      throw err;
    }
}




async function sendNotificationEmail(to,title,description) {
  try {
    const info = await transporter.sendMail({
      from: 'rafimoqaddus@gmail.com',
      to,
      subject: title,
      html: description,
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}



module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendNotificationEmail,
};
