// EXPORT ไปที่ models/post.js ตรง postType ที่เป็น ENUM เผื่อเอาไว้ใช้ซ้ำ

// post.js
exports.POSTTYPE_SEEKER = "SEEKER";
exports.POSTTYPE_SELLER = "SELLER";

// transaction.js
exports.STATUS_PENDING = "PENDING";
exports.STATUS_CANCEL = "CANCEL";
exports.STATUS_SUCCESS = "SUCCESS";
