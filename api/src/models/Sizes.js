const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "sizes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
