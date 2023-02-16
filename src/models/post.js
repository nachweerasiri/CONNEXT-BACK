// TABLE post

const { POSTTYPE_SEEKER, POSTTYPE_SELLER } = require("../config/constant");

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "Post",
        {
            topic: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2), // 10 คือหลัก 2 คือทศนิยมได้แค่2ตัว
            },
            description: { type: DataTypes.STRING },
            contact: {
                type: DataTypes.STRING,
            },
            posterImage: {
                type: DataTypes.STRING,
            },
            contact: {
                type: DataTypes.STRING,
            },
            // ticketCategory: {
            //     type: DataTypes.STRING,
            // },
            postType: {
                type: DataTypes.ENUM(POSTTYPE_SEEKER, POSTTYPE_SELLER),
            },
            // availability: {
            //     type: DataTypes.BOOLEAN,
            //     allowNull: false,
            //     validate: {
            //         notEmpty: true,
            //     },
            // },
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
            },
            // ในกรณีที่มีการลบ foreignKey จะไม่อนุญาติให้ลบ ถ้ามี constant
            onDelete: "RESTRICT",
        });

        // เชื่อมความ 3000 One to One ระหว่าง post กับ transaction
        Post.hasOne(db.Transaction, {
            foreignKey: {
                name: "postId",
            },
            // ในกรณีที่มีการลบ foreignKey จะไม่อนุญาติให้ลบ ถ้ามี constant
            onDelete: "RESTRICT",
        });
    };

    return Post;
};
