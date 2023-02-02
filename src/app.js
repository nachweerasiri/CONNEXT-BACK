// import
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const morgan = require("morgan");
const helmet = require("helmet");
const expressRateLimit = require("express-rate-limit");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan("dev"));
app.use(helmet());
app.use(
    expressRateLimit({
        windowMs: 1000 * 60 * 15,
        max: 100,
        message: { message: "too many requests, please try again later" },
    })
);

// อยู่ใน middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
    console.log(chalk.bgMagenta.bold.italic`server running on port: ${port}`)
);

// // sync ไป table ใน mySQL workbench
// const { sequelize } = require("./models");
// sequelize.sync({ force: true });
