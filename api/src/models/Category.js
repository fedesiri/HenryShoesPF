import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Category = sequelize.define(
  "Category",
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

export default Category;