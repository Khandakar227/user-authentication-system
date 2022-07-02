const express = require("express");
const { validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const User = require("../models/user");
const { createVerificationToken, sendVerificationMail } = require("../lib/verifyEmail");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async function (req, res, next) {
  try {
    //request body Validated result.
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    
    const { email, name, password, contact, nid, role, dateTime } = req.body;
    
    const checkEmail = await User.findOne({email});
    if (checkEmail)
      return res.status(400).json({message: "Email is already in use"})

    const hash = await bycrypt.hash(password, 10); //Hash the password

    const user = new User({
      email,
      name,
      password: hash,
      nid,
      role,
      dateTime,
      contact,
    });
    //Add the user to the database
    await user.save();
    //Send an email verification link
    const verificationToken = createVerificationToken(user._id);
    await sendVerificationMail(verificationToken, user.email);

    res.status(201).json({ message: "New User added!. Check your email. A verification link was sent." });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
