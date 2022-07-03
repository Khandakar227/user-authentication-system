const express = require("express");
const { verify } = require("jsonwebtoken");

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async function resetPassword(req, res, next) {
    if (req.method === "GET") {
      const {token} = req.params;
      // const payload = verify(token, process.env.EMAIL_SECRET);
     
      res.status(200).send(passwordResetInput(token));
    } else if (req.method === "POST") {
        return 
    }
  };

/**
 * 
 * @param {string} token 
 * @returns
 */
function passwordResetInput(token) {
    const title = "Reset your password"
    const url = "http://localhost:8000/api/resetpassword/"+token;
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
            <input type="password" name="password" aria-label="password">
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
