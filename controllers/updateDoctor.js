const express = require("express");
const Doctor = require("../models/doctor");
const doctor = require("../models/doctor");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { name, contact, nid, specialty } = req.body;
    const updatedDoc = await Doctor.findByIdAndUpdate(id, {
      ...doctor,
      name,
      contact,
      nid,
      specialty,
    });
    res.status(200).json({ message: "Update successful", result: updatedDoc });
  } catch (error) {
    res.status(500).json(error);
  }
};
