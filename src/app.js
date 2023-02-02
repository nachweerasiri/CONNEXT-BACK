// sync ไป table ใน mySQL workbench
const { sequelize } = require("./models");
sequelize.sync({ force: true });
