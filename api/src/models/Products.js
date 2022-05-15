const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inOferta: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      inDestacados: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      porcentaje: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
