import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const products_sizes = sequelize.define("products_sizes",
{
    productId:{
        type: DataTypes.INTEGER,
    },
    sizeId: {
        type: DataTypes.INTEGER,
    }
}, { timestamps: true })


export default products_sizes