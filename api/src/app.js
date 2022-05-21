const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
const passport = require("passport");
// const session = require("express-session");
const cookieSession = require('cookie-session')

require("./db.js");

//Passport
require("./middlewares/passport.js");

const server = express();

server.use(
  cors({
    origin: "http://localhost:3000",
  })
);

server.name = "API";
const origin = ["http://localhost:3000"];
const methods = ["GET", "POST", "OPTIONS", "PUT", "DELETE"];

server.use(
  cors({
    origin: origin,
    methods: methods,
  })
);
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cookieSession({
  name: 'session',
  keys: ['henry'],
  maxAge: 24 * 60 * 60 * 1000
}))
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


server.use(passport.initialize());
server.use(passport.session());
server.use("/", routes);



// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
