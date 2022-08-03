//@ts-check
const express = require("express");
const User = require("../models/user");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async function (req, res, next) {
  try {
    const { id } = req.params;
    const { name, contact, nid } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      contact,
      nid,
    });
    res.status(200).json({ message: "Update successful", result: updatedUser });
  } catch (error) {
      res.status(500).json(error);
  }
  
}