import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import bcryptjs from "bcryptjs";
import Role from "./Role.js";

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: "Email already exists!",
      },
    },
    address: {
      type: DataTypes.TEXT,
      isAlphanumeric: true,
    },
    address2:{
      type: DataTypes.TEXT,
      isAlphanumeric: true,
    },
    city: {
      type: DataTypes.STRING,
    }, 'province/region': {
      type: DataTypes.STRING,
    }, zipcode: {
      type: DataTypes.TEXT,
      isAlphanumeric: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    resetToken: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        if (user.password) {
          user.password = bcryptjs.hashSync(user.password, 10);
        }
      },
      beforeUpdate: (user) => {
        if (user.password) {
        user.password = bcryptjs.hashSync(user.password, 10);
      } 
      },
    },
  }
);

Role.hasMany(User, {
  foreignKey: "roleId",
  sourceKey: "id",
});
User.belongsTo(Role, {
  foreignKey: "roleId",
  targetKey: "id",
});

export default User