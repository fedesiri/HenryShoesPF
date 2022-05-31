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
            type: DataTypes.ENUM,
            values: ['1', '2', '3', '4', '5'],
        },
    },
    { timestamps: false }    
);

Products.hasMany(Reviews);
Reviews.belongsTo(Products);

User.hasMany(Reviews);
Reviews.belongsTo(User);

export default Reviews;