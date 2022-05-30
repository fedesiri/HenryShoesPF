import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Orders = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  { timestamps: true }
);

export default Orders;