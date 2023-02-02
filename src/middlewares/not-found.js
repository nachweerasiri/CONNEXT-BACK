// middlewares ที่ handler เวลาที่มี request เข้ามา แล้ว server ไม่รู้จัก
module.exports = (req, res, next) => {
    res.status(404).json({ message: "resource not found on this server" });
};
