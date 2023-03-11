const fs = require("fs");

const { Post, User } = require("../models");
const cloudinary = require("../utils/cloudinary");

exports.getPostbyId = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const post = await Post.findOne({ where: { id } });
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

exports.createPostAddTicket = async (req, res, next) => {
  try {
    console.log(req.user);
    const posterUrl = await cloudinary.upload(req.file.path);
    const post = await Post.create({
      topic: req.body.topic,
      price: req.body.price,
      description: req.body.description,
      contact: req.body.contact,
      userId: req.user.id,
      postType: req.body.postType,
      posterImage: posterUrl
    });
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

/** รูป POSTER เดี๋ยวค่อยกลับมาทำ */
// exports.createPosterAddticket = async (req, res, next) => {
//     try {
//         let value;
//         if (!req.files.posterImage) {
//         } else if (req.files.posterImage) {
//             const posterImage = await Promise.all([
//                 cloudinary.upload(
//                     req.files.posterImage[0].path,
//                     req.post.posterImage
//                         ? cloudinary.getPublicId(req.post.posterImage)
//                         : null
//                 ),
//             ]);
//             value = { posterImage };
//         } else if (req.files.posterImage) {
//             const posterImage = await cloudinary.upload(
//                 req.files.posterImage[0].path,
//                 req.post.posterImage
//                     ? cloudinary.getPublicId(req.post.posterImage)
//                     : null
//             );
//             value = { posterImage };
//         }

//         await post.update(value, { where: { id: req.post.id } });
//         res.status(200).json({ message: "success post" });
//     } catch (err) {
//         next(err);
//     } finally {
//         /** DELETE ลบรูป */
//         if (req.files.posterImage) {
//             fs.unlinkSync(req.files.posterImage[0].path);
//         }
//     }
// };

exports.getPostAddticket = async (req, res, next) => {
  try {
    /** shorthand */
    const { postType } = req.params;
    const getPost = await Post.findAll({
      where: { postType }
    });
    res.status(200).json({ getPost });
  } catch (err) {
    next(err);
  }
};
