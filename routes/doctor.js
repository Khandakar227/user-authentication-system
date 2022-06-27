const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const doctorLoginHandler = require("../controllers/doctorLoginHandler");
const doctorSignUp = require("../controllers/doctorSignUp");
const getDoctor = require("../controllers/getDoctor");
const updateDoctor = require("../controllers/updateDoctor");
const checkAuth = require("../middlewares/checkAuth");
const verifyDoctorId = require("../middlewares/verifyDoctorId");

router.post(
  "/login",
  body("email").isEmail().withMessage('Not an e-mail').normalizeEmail(),
  doctorLoginHandler
);

router.post(
  "/signup",
  body("email").isEmail().normalizeEmail().notEmpty().withMessage('Email is required'),
  body("name").trim().escape().notEmpty().withMessage('Name is required'),
  body("password").isLength({ min: 7 }).withMessage('must be at least 7 characters long').notEmpty(),
  body("contact").trim().notEmpty().withMessage('Contact number is required').escape(),
  body("nid").trim().notEmpty().withMessage('NID is required').escape(),
  doctorSignUp
);

router.get(
  "/:id",
  param("id").trim().escape(),
  getDoctor()
)
router.put("/:id", checkAuth, verifyDoctorId, updateDoctor);

router.delete("/:id", checkAuth, verifyDoctorId, )
module.exports = router;
