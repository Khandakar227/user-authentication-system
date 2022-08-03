const express = require("express");
const jwt = require("jsonwebtoken");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports =
  (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        res.status(400).json({message: "Unauthorized"})
        return
      }
      //get the token from authorization header
      const token = req.headers.authorization.split(" ")[1];
      //Verify token
      jwt.verify(token, process.env.JWTSECRETKEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Unauthorized!",
            redirect: "/login",
          });
        }
        //Move to the next function
        next();
      });
    } catch (error) {
      res.status(401).json({ message: "Auth failed!" });
    }
  };
