const express = require("express");

const userController = require("../controllers/user-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/:userId", userController.getUserInfoById);

router.patch(
    "/",
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "posterImage", maxCount: 1 },
    ]),
    userController.updateProfileImage
); // ใช้ multer อัพเดท

module.exports = router;
