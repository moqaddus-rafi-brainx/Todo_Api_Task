
require('dotenv').config();
const FRONT_PORT=process.env.FRONT_PORT

function generateVerificationLink(token) {
    return `http://localhost:${FRONT_PORT}/verify-email?token=${encodeURIComponent(token)}`;
}

function generateResetLink(token) {
    return `http://localhost:${FRONT_PORT}/reset-password?token=${token}`;
}

module.exports = {
    generateResetLink,
    generateVerificationLink
  };
  

