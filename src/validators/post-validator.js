// Joi เอาไว้ใช้สำหรับการกรอกอะไรผิดแล้วมันจะมีคำขึ้นมา และสามารถกำหนด messages เองได้ด้วย
const Joi = require("joi");

const validate = require("./validate");

/** POST */
const postSchema = Joi.object({
    topic: Joi.string().trim().required().messages({
        "any.required": "Topic is required",
        "string.empty": "Topic is required",
        "string.base": "Topic must be a string",
    }),
    price: Joi.string().email({ tlds: false }).messages({
        "any.required": "Price is required",
        "string.empty": "Price is required",
        "string.base": "Price must be a string",
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

/** LOGIN */
const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

exports.validateLogin = validate(loginSchema);
