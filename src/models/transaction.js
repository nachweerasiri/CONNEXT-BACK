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
    return Transaction;
};
