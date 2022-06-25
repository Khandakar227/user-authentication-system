const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userLoginHandler = require("../controllers/userLoginHandler");
const userSignUp = require("../controllers/userSignUp");

router.post(
  "/login",
  body("email").isEmail().withMessage('Not an e-mail').normalizeEmail(),
  userLoginHandler
);

router.post(
  "/signup",
  body("email").isEmail().normalizeEmail().notEmpty().withMessage('Email is required'),
  body("name").trim().escape().notEmpty().withMessage('Name is required'),
  body("password").isLength({ min: 7 }).withMessage('must be at least 7 characters long').notEmpty(),
  body("contact").trim().notEmpty().withMessage('Contact number is required').escape(),
  body("nid").trim().notEmpty().withMessage('NID is required').escape(),
  userSignUp
);

module.exports = router;
