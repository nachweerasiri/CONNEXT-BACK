const { validateRegister } = require("../validators/auth-validator");
const { User } = require("../models");
const createError = require("../utils/create-error");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
    try {
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
    // const value = validateLogin(req.body);
    try {
    } catch (err) {
        next(err);
    }
};
