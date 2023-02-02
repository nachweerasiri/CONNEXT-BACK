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
            contact: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
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

    Post.associate = db => {
        // เชื่อมความ 3000 One to Many ระหว่าง post กับ user
        Post.belongsTo(db.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            // ในกรณีที่มีการลบ foreignKey จะไม่อนุญาติให้ลบ ถ้ามี constant
            onDelete: "RESTRICT",
        });

        // เชื่อมความ 3000 One to One ระหว่าง post กับ transaction
        Post.hasOne(db.Transaction, {
            foreignKey: {
                name: "postId",
                allowNull: false,
            },
            // ในกรณีที่มีการลบ foreignKey จะไม่อนุญาติให้ลบ ถ้ามี constant
            onDelete: "RESTRICT",
        });
    };

    return Post;
};
