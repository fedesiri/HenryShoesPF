const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User, Role } = require("../db.js");
// const { GOOGLE } = require("./config.js");
const GOOGLE = require("./config.js");
const { generateToken } = require("../middlewares/authJwt.js");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE.clientID,
      clientSecret: GOOGLE.clientSecret,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const googleUser = profile._json;
      // console.log(googleUser);
      try {
        const user = await User.findOne({ where: { email: googleUser.email } });
        if (!user) {
          const newUser = await User.create({
            name: googleUser.given_name,
            lastname: googleUser.family_name,
            username: googleUser.name,
            email: googleUser.email,
            role: "user",
          });
          const roleUser = await Role.findOne({
            where: {
              name: "user",
            },
          });
          await roleUser.addUser(newUser);
        }
        return done(null, {profile, roleId: 2});
      } catch (error) {
        done(error);
      }
    }
  )
);
