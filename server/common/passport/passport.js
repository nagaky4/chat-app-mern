var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
var config = require("config");
var helper = require("../../helpers/helper");
var userModal = require("../../modal/user/userModal");

module.exports = function(app) {
  app.use(passport.initialize());

  passport.use(
    "login-user-local",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        console.log("email", email);
        console.log("password", password);
        userModal
          .findUserByEmail(email)
          .then(data => {
            if (data) {
              if (helper.CheckPassWord(password, data.password)) {
                var user = {
                  _id: data._id,
                  email: data.email
                };
                return done(null, user);
              } else {
                return done(null, false, { message: "password is wrong!" });
              }
            } else {
              return done(null, false, { message: "user is not exists!" });
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

        userModal
          .findUserByEmail(jwtPayload.email)
          .then(data => {
            console.log("chứng thực employ qua token thành công");
            var user = {
              _id: data._id,
              email: data.email
            };
            return done(null, user);
          })
          .catch(err => {
            console.log(err);
            return done(err);
          });
      }
    )
  );
};
