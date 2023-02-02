// TABLE user

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            profileImage: DataTypes.STRING,
        },
        {
            underscored: true,
        }
    );

    User.associate = db => {
        // เชื่อมความ 3000 One to Many ระหว่าง user กับ post
        User.hasMany(db.Post, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            // ในกรณีที่มีการลบ foreignKey จะไม่อนุญาติให้ลบ ถ้ามี constant
            onDelete: "RESTRICT",
        });

        // เชื่อมความ 3000 One to Many ระหว่าง user กับ transaction
        User.hasMany(db.Transaction, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            // ในกรณีที่มีการลบ foreignKey จะไม่อนุญาติให้ลบ ถ้ามี constant
            onDelete: "RESTRICT",
        });
    };

    return User;
};
