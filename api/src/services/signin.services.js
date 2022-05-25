import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

//*funciona
export const getUserService = async (email) => {
  console.log(email)
  try {
    const user = await User.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    throw error;
  }
};

// export const matchUserPasswordService = async (user, password) => {
//   try {
//     const match = await user.comparePassword(password);
//     console.log(match)
//     return match;
//   } catch (error) {
//     throw error;
//   }
// };

export const matchUserPasswordService = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export const createUserTokenService = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export const createRefreshTokenService = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
