const express = require("express");
const Doctor = require("../models/doctor");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async function (req, res, next) {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) return res.status(200).json({ message: "Doctor not found" });

    return res.status(200).json({
      name: doctor.name,
      contact: doctor.contact,
      email: doctor.email,
      dateTime: doctor.dateTime,
      nid: doctor.nid,
      specialty: doctor.specialty,
      verified: doctor.verified,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
