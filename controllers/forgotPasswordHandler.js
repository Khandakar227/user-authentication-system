const express = require("express");
const { verify } = require("jsonwebtoken");
const User = require("../models/user");

module.exports =
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
   async function forgotPassword (req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      
      const { email } = req.body;
      const user = await User.findOne({email});
      if (!user) 
        return res.status(400).json({message: "The email is not registered"});
      //Send password changing link to the email
     
   }