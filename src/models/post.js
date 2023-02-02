// TABLE post

const { POSTTYPE_SEEKER, POSTTYPE_SELLER } = require("../config/constant");

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "Post",
        {
            topic: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            price: {
                type: DataTypes.DECIMAL(10, 2), // 10 คือหลัก 2 คือทศนิยมได้แค่2ตัว
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            description: { type: DataTypes.STRING },
            posterImage: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            ticketCategory: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            postType: {
                type: DataTypes.ENUM(POSTTYPE_SEEKER, POSTTYPE_SELLER),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            availability: {
                type: DataTypes.BOOLEAN,
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
    return Post;
};
