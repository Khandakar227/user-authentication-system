const express = require("express");
const { verify } = require("jsonwebtoken");
const User = require("../models/user");

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */

  async function verificationHandler(req, res, next) {
    const { token } = req.params;

    // Check we have an id
    if (!token) {
      return res.status(422).send({
        message: "Missing Token",
      });
    }

    try {
      // Verify the token
      const payload = verify(token, process.env.EMAIL_SECRET);
      // Find user with matching ID
      const user = await User.findById(payload._id);
      if (!user) {
        return res.status(404).json({
          message: "User does not  exists",
        });
      }
      // Update user's verified property to true
      user.verified = true;
      await user.save();

      return res.status(200).json({
        message: "Account Verified",
      });

    } catch (error) {
      return res.status(500).send(error);
    }
  };


module.exports = verificationHandler;