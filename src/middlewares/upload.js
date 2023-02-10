const chalk = require("chalk");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // (1=การระบุถ้ามีerror ในที่นี้ตั้งเป็น null, 2=พื้นที่เก็บ images)
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        console.log(req),
            console.log(chalk.cyan("===================================")),
            console.log(file);
        console.log(chalk.magenta("***********************************"));

        // ตั้งชื่อไฟล์ตามเวลา
        cb(
            null,
            new Date().getTime() +
                "" +
                Math.round(Math.random() * 10000000) +
                "." +
                file.mimetype.split("/")[1]
        );
    },
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimeType !== "image/jpg") {
//         cb(new Error("hey not image file"));
//     }
// };

/* destination and filename */
module.exports = multer({ storage });
