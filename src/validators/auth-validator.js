// Joi เอาไว้ใช้สำหรับการกรอกอะไรผิดแล้วมันจะมีคำขึ้นมา และสามารถกำหนด messages เองได้ด้วย
const Joi = require("joi");

const validate = require("./validate");

const registerSchema = Joi.object({
    userName: Joi.string().trim().required().messages({
        "any.required": "User Name is required",
        "string.empty": "User Name is required",
        "string.base": "User Name must be a string",
    }),
    yourEmail: Joi.string().email({ tlds: false }).messages({
        "any.required": "Email is required",
        "string.empty": "Email is required",
        "string.base": "Email must be a string",
    }),
    newPassword: Joi.string().alphanum().min(6).required().trim().messages({
        "string.empty": "Password is required",
        "string.alphanum": "Password must contain number or alphabet",
        "string.min": "Password must have at least 6 characters",
    }),
    confirmPassword: Joi.string()
        // ก็คือ ค่าที่ Valid ได้ จะต้อง reference ไปเหมือน newPassword
        .valid(Joi.ref("newPassword"))
        .required()
        .trim()
        .messages({
            "string.empty": "Confirm password is required",
            "any.only": "Password and confirm password did not match",
        }),
});

exports.validateRegister = validate(registerSchema);
// exports.validateLogin = validate(loginSchema);
