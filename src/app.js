// import
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const morgan = require("morgan");
const helmet = require("helmet");
const expressRateLimit = require("express-rate-limit");

const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const authenticateMiddleware = require("./middlewares/authenticate");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const postRoute = require("./routes/post-route");

const app = express();

app.use(morgan("dev"));
app.use(
    expressRateLimit({
        windowMs: 1000 * 60 * 15,
        max: 100,
        message: { message: "too many requests, please try again later" },
    })
);
app.use(helmet());
app.use(cors());
app.use(express.json()); // parsing requset body ส่งมาใน format application/json

app.use("/auth", authRoute);
app.use("/users", authenticateMiddleware, userRoute);
app.use("/post", authenticateMiddleware, postRoute);

// อยู่ใน middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
    console.log(chalk.bgMagenta.bold.italic`server running on port: ${port}`)
);

/* RESET ข้อมูลใน DATA ทั้งหมดด้วย / sync ไป table ใน mySQL workbench */
// const { sequelize } = require("./models");
// sequelize.sync({ force: true });
