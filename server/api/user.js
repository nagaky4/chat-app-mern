var express = require("express");
var router = express.Router();

var userModal = require("../modal/user/userModal");
var helper = require("../helpers/helper");

/* GET home page. */

router.get("/users", (req, res) => {
  userModal
    .getUsers()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => res.status(500).json(err));
});

router
  .route("/user")
  .post((req, res) => {
    var user = {
      email: req.body.user.email,
      password: helper.HashPassword(req.body.user.password)
    };
    console.log(user);
    if (user) {
      userModal
        .insertUser(user)
        .then(data => {
          return res.status(200).json(data);
        })
        .catch(err => res.status(500).json(err));
    } else {
      return res.status(400).json({ error: "bad request" });
    }
  })
  .put((req, res) => {
    var user = req.body.user;
    console.log("user", user);
    if (user) {
      userModal
        .updateUser(user)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
      return res.status(400).json({ error: "bad request" });
    }
  })
  .patch((req, res) => {
    var user = req.body.user;
    if (user) {
      userModal
        .updateUserStatus(user)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
      return res.status(400).json({ error: "bad request" });
    }
  })
  .delete((req, res) => {
    var _id = req.body._id;
    if (_id) {
      userModal
        .deleteUser(_id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
      return res.status(400).json({ error: "bad request" });
    }
  });

module.exports = router;
