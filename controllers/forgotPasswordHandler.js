const express = require("express");
const { createVerificationToken, sendPasswordResetLink } = require("../lib");
const User = require("../models/user");

module.exports =
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async function forgotPassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "The email is not registered" });
      //Send password changing link to the email
      const token = createVerificationToken({ _id: user._id, email });
      sendPasswordResetLink(email, token);
      res
        .status(201)
        .json({ message: "Check your email a password reset email was sent." });
    } catch (error) {
      res.status(500).json({ ...error });
    }
  };
