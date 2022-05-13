const { DataTypes } = require("sequelize");
var bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username already exists!",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: {
          args: true,
          msg: "Email already exists!",
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: true,

      hooks: {
        beforeCreate: (user) => {
          user.password = bcrypt.hashSync(user.password, 10);
        },
        beforeUpdate: (user) => {
          user.password = bcrypt.hashSync(user.password, 10);
        },
      },
    }
  );
};
