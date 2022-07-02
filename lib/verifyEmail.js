const { createTransport } = require("nodemailer");

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

  await transporter.sendMail({
    to: email,
    subject: "Verify Account",
    html: `<p>Click <a href='${url}'>here</a> to confirm your email.</p>`,
  });
}

module.exports = { sendVerificationMail };
