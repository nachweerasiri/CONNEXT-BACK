/** สร้าง obj error แล้ว parse ไปที่ message ให้เป็น default message ของมัน */
module.exports = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
};
