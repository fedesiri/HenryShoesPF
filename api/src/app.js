import express from "express";
import routes from "./routes/index.routes.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import corsOptions from "./config/cors.config.js";
import passport from "passport";
import passportMiddleware, { signInGoogle } from "./middlewares/passport.js";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
var routesArray = ["/signin", "/", "/signup"];
app.use(
  routesArray,
  session({
    name: "session",
    key: "express.sessionID",
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      domain: "localhost",
      httpOnly: true,
      path: "/",
    },
  })
);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))



app.use(cors(corsOptions), (req, res, next) => {
  res.header("Access-Control-Allow-Origin"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(passportMiddleware);
passport.use(signInGoogle);

app.use("/", routes);

export default app;
