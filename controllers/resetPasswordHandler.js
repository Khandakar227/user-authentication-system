const { hash } = require("bcryptjs");
const express = require("express");
const { validationResult } = require("express-validator");
const { verify } = require("jsonwebtoken");
const User = require("../models/user");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function resetPassword(req, res, next) {
  try {
    const { token } = req.params;
    verify(token, process.env.EMAIL_SECRET, async function (err, decoded) {
      //Check if token is valid
      if (err) {
        res.status(400).json({
          message: "Invalid token!",
        });

        //Request body validation result. Throw error for invalid values.
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() });

        //For get request send a password changing form
        if (req.method === "GET") {
          res.status(200).send(passwordResetInput(token));
        }
        //For post request reset given password
      } else if (req.method === "POST") {
        const payload = decoded;
        const { password } = req.body;
        const hashPassword = await hash(password, 10);

        if (payload && payload._id) {
          await User.findByIdAndUpdate(payload._id, {
            password: hashPassword,
          });
          res.status(201).json({ message: "Password changed successfully." });
        }
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

/**
 *
 * @param {string} token
 * @returns
 */
function passwordResetInput(token) {
  const title = "Reset your password";
  const url = "http://localhost:8000/api/resetpassword/" + token;
  return `
  <!DOCTYPE html>
<html>
     <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>h2{text-align: center;font-family: sans-serif;} form {display: flex;gap: 0.5rem;justify-content: center;max-width: 250px;flex-direction: column;margin: 0 auto;}</style>

    </head>
    <body>
        <h2> Reset password </h2>
        <form>
            <label for="password"> Enter new password:</label>
            <input type="password" name="password" aria-label="password" required>
            <input type="submit" name="change password" aria-label="change password" value="Change password">
        </form>

        <script defer>
            const form = document.querySelector("form");
            
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                fetch("${url}", {headers: {'Accept': 'application/json','Content-Type': 'application/json'},method: "POST",body: JSON.stringify(data)})
                .catch(err => console.log(err));
            })
        </script>
    </body>
</html>

    `;
}

module.exports = resetPassword;
