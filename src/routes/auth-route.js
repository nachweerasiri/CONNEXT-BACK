const express = require("express");

const authController = require("../controllers/auth-controller");

const router = express.Router();

// /register ก็คือ ไปที่ ../controllers/auth-controller วิ่งไปทำงานที่ exports.register
router.post("/register", authController.register);

module.exports = router;
