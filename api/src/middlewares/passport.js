import { ExtractJwt, Strategy } from "passport-jwt";
import dotenv from "dotenv";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/User.js";
import Role from "../models/Role.js";
import ShoppingCart from "../models/ShoppingCart.js";

// const GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config();

const optStrategy = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default new Strategy(optStrategy, async (payload, done) => {
  console.log("PAYLOAD", payload);
  try {
    const user = await User.findByPk(payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(null, false);
  }
});


export const signInGoogle = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/signin/google/callback",
    passReqToCallback: true,
  },
  async (accessToken, refreshToken, email, profile, done) => {
    const defaultUser = {
      name: profile.name.givenName,
      lastname: profile.name.familyName,
      email: profile.emails[0].value,
      isVerified: true,
    };
    try {
      const user = await User.findOrCreate({
        where: { email: defaultUser.email },
        defaults: defaultUser,
      });
      const roleUser = await Role.findOne({
        where: {
          name: "user",
        },
      });
      console.log(user[0], "USER PASSPORT")
      await roleUser.addUser(user[0]);
      const newCart = await ShoppingCart.findOrCreate({
        where: {
          email: user[0].email,
        }
      });
      // await user[0].addShoppingCart(newCart);

      if (user && user[0]) return done(null, user && user[0]);
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  }
);

passport.serializeUser((user, done) => {
  // console.log("SERIALIZE", user);
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
    // console.log("DESERIALIZE", user);
    if (user) {
      done(null, user);
    }
  } catch (error) {
    done(error, null);
    console.log(error, "ERROR");
  }
});
