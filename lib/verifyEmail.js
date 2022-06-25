const { createTransport } = require("nodemailer");
const jwt = require("jsonwebtoken");

/**
 * @param {string} id
 */
function createVerificationToken(id) {
  return jwt.sign({ _id: id }, process.env.EMAIL_SECRET, {
    expiresIn: process.env.EMAIL_VERIFICATION_EXP,
  });
}

/**
 *
 * @param {string} email
 * @param {string} token
 */
async function sendVerificationMail(token, email) {
  const transporter = createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const url = `http://localhost:8000/api/verify/${token}`;

  const sendMessageInfo = await transporter.sendMail({
    to: email,
    subject: "Verify Account",
    html: `<p>Click <a href='${url}'>here</a> to confirm your email.</p>`,
  });
}

module.exports = { createVerificationToken, sendVerificationMail };
