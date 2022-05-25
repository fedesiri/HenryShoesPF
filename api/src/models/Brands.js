import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Products from "./Products.js";

const Brands = sequelize.define(
  "brands",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
      unique: true,
    },
  },
  { timestamps: false }
);

Brands.hasMany(Products, {
  foreignKey: "brandName",
  sourceKey: "name",
});

Products.belongsTo(Brands, {
  foreignKey: "brandName",
  targetKey: "name",
});



export default Brands