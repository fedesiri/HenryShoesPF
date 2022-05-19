const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ShoppingCart",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            },
        statusOpen: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
      }
    }
  );
};