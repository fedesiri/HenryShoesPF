import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Category from "./Category.js";
import Sizes from "./Sizes.js";
import User from "./User.js";
import products_sizes from './products_sizes.js'
import ShoppingCart from "./ShoppingCart.js";

const Products = sequelize.define(
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
      allowNull: true,
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
      defaultValue: null,
    },
  },
  { timestamps: false }
);


Category.hasMany(Products, {
  foreignKey: "CategName",
  sourceKey: "name",
});

Products.belongsTo(Category, {
  foreignKey: "CategName",
  targetKey: "name",
});

Products.belongsToMany(Sizes, { through: products_sizes });
Sizes.belongsToMany(Products, { through: products_sizes });

User.belongsToMany(Products, {through: "wishlist"})
Products.belongsToMany(User, {through: "wishlist"})

export default Products;