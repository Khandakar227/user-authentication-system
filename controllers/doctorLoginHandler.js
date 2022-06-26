const express = require("express");
const { validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async function doctorLoginHandler(req, res, next) {
  try {
    //request body Validated result.
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    //Look for a doctor wth a given email...
    const doctor = await Doctor.findOne({ email });

    if (!doctor)
      return res.status(401).json({
        token: "error",
        expiresIn: "error",
        docId: "error",
        message: "Email is not registered",
      });

    //If doctor exist check if password was correct
    bycrypt
      .compare(password, doctor.password)
      .then((result) => {
        if (!result)
          return res.status(401).json({
            token: "error",
            expiresIn: "error",
            docId: "error",
            message: "Incorrect password. Please try again",
          });
        //If password was correct create a json web token and send it to the  browser

        const token = jwt.sign(
          {
            email: doctor.email,
            userId: doctor._id,
            name: doctor.name,
            contact: doctor.contact,
            docId: doctor.docId,
          },
          process.env.JWTSECRETKEY,
          { expiresIn: process.env.LOGIN_EXP_TIME }
        );
        res.status(200).json({
          token,
          expiresIn: process.env.LOGIN_EXP_TIME,
          docId: doctor.docId,
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
