const express = require("express");
const { validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const Doctor = require("../models/doctor");
const {
  createVerificationToken,
  sendVerificationMail,
} = require("../lib/verifyEmail");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async function (req, res, next) {
  try {
    //Request body validation result. Throw error for invalid values.
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, name, password, contact, nid, specialty, dateTime } = req.body;
    const hash = await bycrypt.hash(password, 10); //Hash the password

    const doctor = new Doctor({
      email,
      name,
      password: hash,
      nid,
      dateTime,
      contact,
      specialty
    });
    //Add the doctor to the database
    await doctor.save();

    //Send an email verification link
    const verificationToken = createVerificationToken(doctor._id);
    await sendVerificationMail(verificationToken, doctor.email);

    res
      .status(201)
      .json({ message: "Check your email. A verification link was sent." });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
