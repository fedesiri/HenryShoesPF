import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Sizes = sequelize.define("sizes",
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

export default Sizes;
