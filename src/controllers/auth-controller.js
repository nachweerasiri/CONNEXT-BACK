const {
    validateRegister,
    validateLogin,
} = require("../validators/auth-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // access token

const { User } = require("../models");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
    try {
        console.log(req.body);
        const value = validateRegister(req.body);

        //** เช็คว่ามี email ที่ลงทะเบียนไว้หรือเปล่า */
        /** SELECT * FROM user WHERE email = value.email */
        const user = await User.findOne({ where: { email: value.yourEmail } });

        /* func ที่แจ้ง error ว่ามี user นี้มีค่าในระบบแล้ว */
        if (user) {
            createError("email is already in use", 400);
        }

        /** update ค่า password ให้มีค่าที่ได้จากการ hash // 12 คือเลขที่เอาไว้ หน่วงเวลา*/
        value.newPassword = await bcrypt.hash(value.newPassword, 12);
        /** แก้ชื่อ value ใหม่ ให้ไปตรงกับ database */
        const newValue = {
            userName: value.userName,
            email: value.yourEmail,
            password: value.newPassword,
        };
        await User.create(newValue);

        res.status(201).json({
            message: "Register success. please login to continue",
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const value = validateLogin(req.body);
        /** SELECT * FROM user WHERE email = value.email */
        const user = await User.findOne({ where: { email: value.email } });
        /** ถ้าไม่เหมือน user จะลั่น "Invalid email or password", 400*/
        if (!user) {
            createError("Invalid email or password", 400);
        }

        /** เอาไว้ เช็คว่า password ถูกต้องไหม */
        const isCorrect = await bcrypt.compare(value.password, user.password);
        /** ถ้าไม่เหมือน isCorrect จะลั่น "Invalid email or password", 400*/
        if (!isCorrect) {
            createError("Invalid email or password", 400);
        }

        /** payload อยู่ตรงนี้ */
        const accessToken = jwt.sign(
            {
                id: user.id,
                userName: user.userName,
                email: user.email,
                // password: user.password,
                profileImage: user.profileImage,
                createAt: user.createAt,
                updateAt: user.updateAt,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        /** แก้ชื่อ value ใหม่ ให้ไปตรงกับ database */
        // const newValueLogin = {
        //     email: value.yourEmail,
        //     password: value.newPassword,
        // };
        // await User.create(newValueLogin);

        res.status(200).json({ accessToken });
    } catch (err) {
        next(err);
    }
};

exports.getMe = (req, res, next) => {
    res.status(200).json({ user: req.user });
};
