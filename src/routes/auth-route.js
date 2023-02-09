const express = require("express");

const authController = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

// /register ก็คือ ไปที่ ../controllers/auth-controller วิ่งไปทำงานที่ exports.register
router.post("/register", authController.register);

router.post("/login", authController.login);
/** get me ผ่าน middlewhere authenticate ถ้าผ่าน จะถูกไปทำงานใน authController ผ่าน mothod getMe*/
router.get("/me", authenticate, authController.getMe);

module.exports = router;
