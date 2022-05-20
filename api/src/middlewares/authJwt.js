const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { User, Role } = require("../db.js");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const isAdmin = async (req, res, next) => {
  // console.log(req.user.id)
  console.log(req)
    try {
      const user = await User.findByPk(req.userId);
      const roles = await Role.findOne({
        where: {
          id: user.roleId,
        },
      });
      if (roles.id === 1) {
        console.log(user, roles)
        next();
      } else {
        return res.status(403).send({ message: "Require Administrator Role" });
      }
    } catch (error) {
      return res.status(401).send({ message: "Unauthorized" });
    }
  };

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated) {
    return next();
  }
  return res.redirect("http://localhost:3000/");
}

function isLoggedIn(req, res, next) {
  req.user ? next() : res.status(401).send("Unauthorized");
}

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(403)
        .send({ message: "No token, authorization denied" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(403).send({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
module.exports = { isAdmin, comparePassword, isAuthenticated, generateToken, isLoggedIn, verifyToken };



// const isAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.userId);
//     const roles = await Role.findOne({
//       where: {
//         id: user.roleId,
//       },
//     });
//     if (roles.id === 1) {
//       next();
//     } else {
//       return res.status(403).send({ message: "Require Administrator Role" });
//     }
//   } catch (error) {
//     return res.status(401).send({ message: "Unauthorized" });
//   }
// };

// module.exports = {
//   generateToken,
//   comparePassword,
//   verifyToken,
//   isAdmin,
// };
