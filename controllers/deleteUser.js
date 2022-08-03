const { compare } = require("bcryptjs");
const express = require("express");
const User = require("../models/user");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async function (req, res, next) {
  try {
    //Get user's id
    const { id } = req.params;
    //Password is required to delete each account
    const { password } = req.body;
    
    //Find and match user's passwoord
    const user = await User.findById(id);
    //Check if the user exist
    if (!user) res.status(403).json({ message: "Invalid user or password." });
    
    const result = compare(password, user.password);
    if (!result)
      return res.status(403).json({ message: "Invalid user or password." });
    //If the password was correct delete the account
    user.delete();

    res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    res.status(500).json(error);
  }
};
