var express = require("express");
var router = express.Router();
var passport = require("passport");
const jwt = require("jsonwebtoken");
var config = require("config");
var middelwarePassport = require("../common/passport/middlewarePassport");
var helper = require("../helpers/helper");
var accountModal = require("../modal/account/accountModal");
var userModal = require("../modal/users/userModal");

router.post("/login", function(req, res, next) {
  console.log("---------------start login----------------");
  var savepass = req.body.savepass;

  passport.authenticate(
    "login-account-local",
    { session: false },
    (err, account, info) => {
      console.log("err login", err);
      console.log("account", account);
      console.log("info login", info);

      if (err || !account) {
        return res.status(400).send({
          message: info.message
        });
      }

      req.login(account, { session: false }, err => {
        if (err) {
          console.log(err);
          res.status(403).json(err);
        }
        if (savepass) {
          const token = jwt.sign(
            account,
            config.get("passport.secret_key") || "secret-key",
            { expiresIn: "365d" }
          );
          console.log("token 356d : ", token);
          return res.status(200).json(token);
        } else {
          const token = jwt.sign(
            account,
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
  if (req.account && req.isAuthenticated()) {
    return res.status(200).json({
      success: true,
      message: "authenicated",
      account: req.account
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
/**
 * Register account
 */
router.post("/register", async (req, res) => {
  let email = null;
  let password = null;
  if (req.body && req.body.user && req.body.user.email) {
    email = req.body.user.email;
  }
  if (req.body && req.body.user && req.body.user.password) {
    password = req.body.user.password;
  }
  var account = {
    email: email,
    password: helper.HashPassword(password)
  };
  if (account) {
    try {
      let userExits = await accountModal.findAccountByEmail(account.email);
      if (userExits !== null) {
        return res.status(400).json({ error: "Email already in use" });
      } else {
        let newAccount = await accountModal.insertAccount(account);
        if (newAccount) {
          let newUser = await userModal.insertUser(newAccount.email);
          if (newUser) {
            return res
              .status(200)
              .json({ status: 200, message: "Register successfully!" });
          } else {
            res.status(500).json({ err: "Register failer" });
          }
        }
      }
    } catch (err) {
      console.log("err insert new account ", err);
      res.status(500).json({ err: "Register failer" });
    }
  }

  return res.status(400).json({ error: "bad request" });
});

module.exports = router;
