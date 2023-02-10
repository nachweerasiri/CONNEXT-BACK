// const fs = require("fs");
// const { Op } = require("sequelize");
// const createError = require("../utils/create-error");
// const express = require("express");
const { User } = require("../models");
const createError = require("../utils/create-error");

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
        console.log(req.files);
        res.status(200).json();
    } catch (err) {
        next(err);
    }
};
