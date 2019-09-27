var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var config = require("config");
var helper = require("../../helpers/helper");
var accountModal = require("../../modal/account/accountModal");

module.exports = function(app) {
  app.use(passport.initialize());

  passport.use(
    "login-account-local",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        accountModal
          .findAccountByEmail(email)
          .then(data => {
            if (data) {
              if (helper.CheckPassWord(password, data.password)) {
                var account = {
                  _id: data._id,
                  email: data.email
                };
                return done(null, account);
              } else {
                return done(null, false, { message: "password is wrong!" });
              }
            } else {
              return done(null, false, { message: "account is not exists!" });
            }
          })
          .catch(err => {
            console.log("err passport when login" + err);
            if (err) return done(null, false, { message: err });
          });
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get("passport.secret_key") || "secret-key"
      },
      function(jwtPayload, done) {
        console.log("TCL: jwtPayload", jwtPayload);

        accountModal
          .findAccountByEmail(jwtPayload.email)
          .then(data => {
            var account = {
              _id: data._id,
              email: data.email
            };
            return done(null, account);
          })
          .catch(err => {
            console.log(err);
            return done(err);
          });
      }
    )
  );
};
