const bcrypt = require("bcrypt");

var config = require("config");

const saltRounds = config.get("helper.saltRounds");

function HashPassword(password) {
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}

function CheckPassWord(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  HashPassword: HashPassword,
  CheckPassWord: CheckPassWord
};
