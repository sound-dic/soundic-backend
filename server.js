require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const routers = require("./routes/index.route");
const expressOverride = require("./utils/express-overrides");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(expressOverride());
app.use(routers);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  const { statusCode, message } = err;

  res.status(err.status || 500).json({
    status: "Error",
    statusCode,
    message,
  });
});

module.exports = app;
