var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");

var getConnectDbString = require("./common/getConnectString");
var accountApi = require("./api/account");
var userApi = require("./api/user");

var passport = require("../server/common/passport/passport");
var loginController = require("./controller/login");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose.connect(
  getConnectDbString(),
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    if (err) {
      console.log("connect db err ", err);
    } else {
      console.log("connect db successfuly");
    }
  }
);
app.use(cors({}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport(app);

app.use("/api", accountApi);
app.use("/api", userApi);
app.use("/api", loginController);
app.get("/", (req, res) => {
  res.render("index", { title: "Server" });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // console.log("err server", err);
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
