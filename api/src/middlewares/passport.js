// const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const { User, Role, ShoppingCart } = require("../db.js");
const { comparePassword } = require("./authJwt.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  "local-register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const findUser = await User.findAll({ where: { email } });
        if (findUser.length) {
          done(null, false, { message: "Email already exists" });
        } else {
          const newUser = await User.create({
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            password: password,
            email: email,
            address: req.body.address,
            role: req.body.role,
          });
          if (req.body.role === "admin") {
            const roleUser = await Role.findOne({
              where: {
                name: "admin",
              },
            });
            await roleUser.addUser(newUser);
          } else {
            const roleUser = await Role.findOne({
              where: {
                name: "user",
              },
            });
            await roleUser.addUser(newUser);
          }
          const NewCart = await ShoppingCart.create({});
          await newUser.setShoppingCart(NewCart);
          done(
            null,
            {
              id: newUser.id,
              name: newUser.name,
              lastname: newUser.lastname,
              username: newUser.username,
              email: newUser.email,
              address: newUser.address,
              // roleId: newUser.roleId,
            },
            {
              ShoppingCart: NewCart,
            },
            { message: "User created successfully" }
          );
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: "Email doesn't exist." });
        }
        const passwordMatch = comparePassword(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password" });
        }
        const Cart = await ShoppingCart.findOne({
          where: {
            email: req.body.email,
          },
        });
        return done(null, {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          address: user.address,
          roleId: user.roleId,
          ShoppingCart: Cart,
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
