const express = require("express");

const postController = require("../controllers/post-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/seeker/:id", postController.getPostbyId);

// router.get("/:postId", userController.getUserInfoById);

// /post ก็คือ ไปที่ ../controllers/post-controller วิ่งไปทำงานที่ exports.post
router.post("/", upload.single("posterImage"), postController.createPostAddTicket);

router.get("/:postType", postController.getPostAddticket);

// router.patch(
//     "/",
//     upload.single("posterImage"),
//     postController.createPosterAddticket
// );

/** get me ผ่าน middlewhere authenticate ถ้าผ่าน จะถูกไปทำงานใน authController ผ่าน mothod getMe*/
// router.get("/me", authenticate, authController.getMe);

/** DELETE */
router.delete("/:postId", postController.deletePost);
/** EDIT */
// router.put("/edit/:postId", authenticate, postController.editPosts);

module.exports = router;
