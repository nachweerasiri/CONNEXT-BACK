// middlewares ที่ handler เวลาที่มี request เข้ามา แล้ว server ไม่รู้จัก

const chalk = require("chalk");

module.exports = (err, req, res, next) => {
    console.log(chalk.bgRed.bold.italic(err));
    res.status(500).json({ message: err.message });
};
