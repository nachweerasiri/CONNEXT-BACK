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
    return User;
};
