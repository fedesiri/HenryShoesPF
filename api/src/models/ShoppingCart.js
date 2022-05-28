import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Orders from "./Orders.js";
import User from "./User.js";

const ShoppingCart = sequelize.define(
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
      defaultValue: true,
    },

  },
  { timestamps: true }
);

ShoppingCart.belongsToMany(Orders, { through: "ShoppingOrder" })
Orders.belongsToMany(ShoppingCart, { through: "ShoppingOrder" })

User.hasMany(ShoppingCart, { foreignKey: "email", sourceKey: "email" })
ShoppingCart.belongsTo(User, { foreignKey: "email", targetKey: "email" })

export default ShoppingCart;