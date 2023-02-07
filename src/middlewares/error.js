// middlewares ที่ handler เวลาที่มี request เข้ามา แล้ว server ไม่รู้จัก

const chalk = require("chalk");

module.exports = (err, req, res, next) => {
    console.log(chalk.bgRed.bold.italic(err));

    if (err.name === "ValidatorError") {
        err.statusCode = 400;
    }

    /** ให้มันขึ้น error ตาม statusCode ถ้าไม้ จะขึ้น 500 */
    res.status(err.statusCode || 500).json({ message: err.message });
};
