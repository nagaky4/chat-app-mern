var config = require("config");

module.exports = () => {
  return `mongodb://${config.get("dbConfig.user")}:${config.get(
    "dbConfig.password"
  )}@ds161121.mlab.com:61121/chat-app-mern`;
};
