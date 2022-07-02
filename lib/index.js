const jwt = require("jsonwebtoken")

/**
 * @param {string | object | Buffer} payload
 */
 function createVerificationToken(payload) {
    return jwt.sign( payload, process.env.EMAIL_SECRET, {
      expiresIn: process.env.EMAIL_VERIFICATION_EXP,
    });
  }

/**
 *
 * @param {string} email
 * @param {string} token
 */
async function sendPasswordResetLink(email, token) {
  const transporter = createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const url = `http://localhost:8000/api/resetpassword/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href='${url}'>here</a> to reset your password.</p>
    <p> If you did not request this please ignore this message`,
  });
}

module.exports = {sendPasswordResetLink, createVerificationToken};