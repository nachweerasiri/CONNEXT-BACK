/** เอาไว้ VERIFY */

const jwt = require("jsonwebtoken"); /** Library ที่เอาไว้ Verify */
const createError = require("../utils/create-error");
const { User } = require("../models");

module.exports = async (req, res, next) => {
    /** Logic ในการ VERIFY */
    try {
        const { authorization } = req.headers;
        /** ถ้า authorization ไม่มีค่า หรือ|| authorization ไม่ได้ขึ้นต้นด้วยคำว่า 'Bearer ' */
        if (!authorization || !authorization.startsWith("Bearer ")) {
            createError("you are unauthorized", 401); //ก็จะขึ้นมาว่า 401 เพราะคุณไม่ได้ส่ง authorization
        }
        const token = authorization.split(" ")[1]; // token คือ เอาค่า authorization มา split ด้วย empty มันจะได้ array ตัวที่ 2 หลังจาก split ตัวที่ 1 ออก = split ได้ token มา
        /** payload คือค่าที่เราได้จากการ verify อยู่ใน auth-controller บรรทัด 60 accessToken*/
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        ); /** Method verify */
        const user = await User.findOne({
            Where: { id: payload.id },
            attributes: {
                exclude: ["password"],
            },
        });
        if (!user) {
            createError("you are unauthorized", 401);
        }

        /** ตรงนี้คือ VERIFY เสร็จแล้ว ไปทำ ... ต่อ */
        /** ถ้าหาเจอ ใส่ค่า user ที่เราหาได้ เข้าไปใน req.user */
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};
