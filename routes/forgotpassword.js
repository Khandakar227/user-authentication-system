const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const forgotPasswordHandler = require("../controllers/forgotPasswordHandler");

router.post("",
body("email").isEmail().normalizeEmail().notEmpty().withMessage('Email is required'),
forgotPasswordHandler
);

module.exports = router;