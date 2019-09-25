let jwt = require("jsonwebtoken");
const config = require("config");

let checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  let secret_key = config.get("passport.secret_key");

  if (token) {
    jwt.verify(token, secret_key, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        req.user = decoded;
        console.log("chứng thực token thành công 1");
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

module.exports = {
  checkToken: checkToken
};
