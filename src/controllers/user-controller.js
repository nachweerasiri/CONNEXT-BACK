const fs = require("fs"); // library ที่เอาไว้ลบรูป
// const { Op } = require("sequelize");
// const createError = require("../utils/create-error");
// const express = require("express");
const { User } = require("../models");
const createError = require("../utils/create-error");
const cloudinary = require("../utils/cloudinary");

exports.getUserInfoById = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.userId,
            },
            attributes: {
                exclude: ["password"],
            },
        });

        if (!user) {
            createError("user with this id is not found", 400);
        }
    } catch (err) {
        next(err);
    }
};

exports.updateProfileImage = async (req, res, next) => {
    try {
        let value;
        if (!req.files.profileImage && !req.files.posterImage) {
            createError("profile image is require");
        } else if (req.files.profileImage && req.files.posterImage) {
            const [profileImage, posterImage] = await Promise.all([
                cloudinary.upload(
                    req.files.profileImage[0].path,
                    req.user.profileImage
                        ? cloudinary.getPublicId(req.user.profileImage)
                        : null
                ),
                cloudinary.upload(
                    req.files.profileImage[0].path,
                    req.user.posterImage
                        ? cloudinary.getPublicId(req.user.posterImage)
                        : null
                ),
            ]);
            value = { profileImage, posterImage };
        } else if (req.files.profileImage) {
            const profileImage = await cloudinary.upload(
                req.files.profileImage[0].path,
                req.user.profileImage
                    ? cloudinary.getPublicId(req.user.profileImage)
                    : null
            );
            value = { profileImage };
        } else {
            const posterImage = await cloudinary.upload(
                req.files.posterImage[0].path,
                req.user.posterImage
                    ? cloudinary.getPublicId(req.user.posterImage)
                    : null
            );
            value = { posterImage };
        }

        await User.update(value, { where: { id: req.user.id } });
        res.status(200).json({ message: "success update" });
    } catch (err) {
        next(err);
    } finally {
        /** DELETE ลบรูป */
        if (req.files.profileImage) {
            fs.unlinkSync(req.files.profileImage[0].path);
        }
        if (req.files.posterImage) {
            fs.unlinkSync(req.files.posterImage[0].path);
        }
    }
};
