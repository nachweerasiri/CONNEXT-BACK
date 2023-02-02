// TABLE transaction

const {
    STATUS_PENDING,
    STATUS_CANCEL,
    STATUS_SUCCESS,
} = require("../config/constant");

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        "Transaction",
        {
            transactionStatus: {
                type: DataTypes.ENUM(
                    STATUS_PENDING,
                    STATUS_CANCEL,
                    STATUS_SUCCESS
                ),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
                defaultValue: STATUS_PENDING,
            },
            slipImage: {
                type: DataTypes.STRING,

                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            ticketImage: {
                type: DataTypes.STRING,

                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            underscored: true,
        }
    );

    Transaction.associate = db => {
        // เชื่อมความ 3000 One to Many ระหว่าง Transaction กับ user
        Transaction.belongsTo(db.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            // ในกรณีที่มีการลบ foreignKey จะไม่อนุญาติให้ลบ ถ้ามี constant
            onDelete: "RESTRICT",
        });

        // เชื่อมความ 3000 One to One ระหว่าง Transaction กับ post
        Transaction.belongsTo(db.Post, {
            foreignKey: {
                name: "postId",
                allowNull: false,
            },
            // ในกรณีที่มีการลบ foreignKey จะไม่อนุญาติให้ลบ ถ้ามี constant
            onDelete: "RESTRICT",
        });
    };

    return Transaction;
};
