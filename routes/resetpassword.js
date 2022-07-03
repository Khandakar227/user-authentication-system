const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const resetPasswordHandler = require("../controllers/resetPasswordHandler");

router.post("/:token",
body("password").isLength({min: 7}).withMessage('Password needs to be atleast 7 character long'),
resetPasswordHandler
);
router.get("/:token", resetPasswordHandler);

module.exports = router;