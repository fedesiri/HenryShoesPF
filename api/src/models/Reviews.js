import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Products from "./Products.js";
import User from "./User.js";

const Reviews = sequelize.define(
    "reviews",
    {
        commentary: {
            type: DataTypes.TEXT,
            allownull: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
    },
    { timestamps: false }    
);

Products.hasMany(Reviews);
Reviews.belongsTo(Products);

User.hasMany(Reviews, { foreignKey: "email", sourceKey: "email" });
Reviews.belongsTo(User, { foreignKey: "email", sourceKey: "email" });

export default Reviews;