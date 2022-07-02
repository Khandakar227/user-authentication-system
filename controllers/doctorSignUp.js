const express = require("express");
const { validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const Doctor = require("../models/doctor");
const { createVerificationToken } = require("../lib/index");
const { sendVerificationMail } = require("../lib/verifyEmail");

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

    const { email, name, password, contact, nid, specialty, dateTime } =
      req.body;
    //Check if the email is already registered
    const checkEmail = await Doctor.findOne({ email });
    if (checkEmail)
      return res.status(400).json({ message: "Email is already in use" });

    //Send an email verification link
    const verificationToken = createVerificationToken({
      _id: doctor._id,
      email,
    });
    await sendVerificationMail(verificationToken, doctor.email);

    const hash = await bycrypt.hash(password, 10); //Hash the password

    const doctor = new Doctor({
      email,
      name,
      password: hash,
      nid,
      dateTime,
      contact,
      specialty,
    });
    //Add the doctor to the database
    await doctor.save();

    res
      .status(201)
      .json({ message: "Check your email. A verification link was sent." });
  } catch (error) {
    res.status(500).json(error);
  }
};
