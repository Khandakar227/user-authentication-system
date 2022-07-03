const express = require("express");
const { validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
async function userLoginHandler(req, res, next) {
  try {
    //request body Validated result.
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    //Look for a user wth a given email...
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        token: "error",
        expiresIn: "error",
        role: "error",
        message: "Email or password is incorrect)",
      });
    }
    //If user exist check if password was correct
    bycrypt
      .compare(password, user.password)
      .then((result) => {
        if (!result)
          return res.status(401).json({
            token: "error",
            expiresIn: "error",
            role: "error",
            message: "Email or password is incorrect",
          });
        //If password was correct create a json web token and send it to the  browser
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.JWTSECRETKEY,
          { expiresIn: process.env.LOGIN_EXP_TIME }
        );
        res.status(200).json({
          token,
          expiresIn: process.env.LOGIN_EXP_TIME,
          role: user.role,
          message: "Logged in Successfully",
        });
      })
      .catch((err) => {
        return res.status(401).json({
          message: "Auth failed",
        });
      });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = userLoginHandler;
