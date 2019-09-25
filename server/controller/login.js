var express = require("express");
var router = express.Router();
var passport = require("passport");
const jwt = require("jsonwebtoken");
var config = require("config");
var middelwarePassport = require("../common/passport/middlewarePassport");

router.post("/login", function(req, res, next) {
  console.log("---------------start login----------------");
  var savepass = req.body.savepass;

  passport.authenticate(
    "login-user-local",
    { session: false },
    (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info.message,
          user: user
        });
      }

      req.login(user, { session: false }, err => {
        if (err) {
          console.log(err);
          res.status(403).json(err);
        }
        if (savepass) {
          const token = jwt.sign(
            user,
            config.get("passport.secret_key") || "secret-key",
            { expiresIn: "365d" }
          );
          console.log("token 356d : ", token);
          return res.status(200).json(token);
        } else {
          const token = jwt.sign(
            user,
            config.get("passport.secret_key") || "secret-key",
            { expiresIn: "3h" }
          );
          console.log("token 3h:", token);
          return res.status(200).json(token);
        }
      });
    }
  )(req, res, next);
});

//passport.authenticate('jwt', {session: false})
router.get("/private", middelwarePassport.checkToken, (req, res) => {
  if (req.user && req.isAuthenticated()) {
    return res.status(200).json({
      success: true,
      message: "authenicated",
      user: req.user
    });
  } else {
    res.status(401).json({
      success: false,
      name: "Unauthorized",
      message: "Bạn chưa đăng nhập"
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
