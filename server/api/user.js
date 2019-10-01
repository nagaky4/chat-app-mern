var express = require("express");
var router = express.Router();
var multer = require("multer");
var fs = require("fs");
// var sizeOf = require("image-size");
var path = require("path");
var userModal = require("../modal/users/userModal");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var dir = path.join(__dirname, "../public/images/user");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage });
/* GET home page. */

router.get("/users", (req, res) => {
  userModal
    .getUsers()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/user/:email", (req, res) => {
  var email = req.params.email;
  console.log("req.param: ", req.params);
  console.log("email email meail", email);
  if (email)
    userModal
      .findUserByEmail(email)
      .then(data => {
        console.log("data", data);
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  else res.status(400).json({ err: "no emaill" });
});

router
  .route("/user")
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

router.post("/user/avatar", upload.single("userAvatar"), async (req, res) => {
  if (!req.file.mimetype.startsWith("image/")) {
    return res.status(422).json({
      error: "this file upload must be an image"
    });
  }

  userModal
    .findUserByEmail(req.body.email)
    .then(data => {
      var avatar = data.profile.avatar;
      if (avatar && avatar.length > 0) {
        var filename = avatar.split("/").pop();
        var dir = path.join(__dirname, `../public/images/user/${filename}`);
        try {
          fs.unlinkSync(dir);
        } catch (err) {
          console.error(err);
        }
      }
    })
    .catch(err => {
      console.log(err);
    });

  const user = {
    email: req.body.email,
    avatar: `${req.protocol}://${req.get("host")}/images/user/${
      req.file.filename
    }`
  };
  try {
    let isAvatarUpdated = await userModal.updateUserAvatar(user);
    if (isAvatarUpdated) {
      return res.status(200).json({ mess: "upload avatar successfully" });
    }
  } catch (err) {
    return res.status(500).send({ err: "Upload avatar failer" });
  }
});

module.exports = router;
