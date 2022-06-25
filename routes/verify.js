const express = require("express");
const router = express.Router();
const { param } = require("express-validator");
const verificationHandler = require("../controllers/verificationHandler");

router.get("/:token", param("token").isJWT(), verificationHandler);

module.exports = router;
