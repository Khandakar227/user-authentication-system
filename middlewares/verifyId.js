const express = require("express");
// const bycrypt = require("bcryptjs");
// const Doctor = require("../models/doctor");
const {verify} = require("jsonwebtoken");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
  module.exports = async function (req, res, next) {
    const { id } = req.params;
    
    if (!req.headers.authorization) {
      res.status(400).json({message: "Unauthorized"})
      return;
    }
    
    //get the token from authorization header
    const token = req.headers.authorization.split(" ")[1];
    const payload = verify(token, JWTSECRETKEY);
    if (id !== payload.userId)
      return res.status(403).json({ message: "Unauthorized" });
    next()
  };
