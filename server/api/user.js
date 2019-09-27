var express = require("express");
var router = express.Router();
var multer = require("multer");
var sizeOf = require("image-size");
var path = require("path");
var userModal = require("../modal/users/userModal");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("req.body", req.body);
    console.log("req.file", req.file);

    cb(null, path.join(__dirname, "../public/images/user"));
  },
  filename: function(req, file, cb) {
    console.log("req.body", req.body);
    console.log("req.file", req.file);
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

router.post("/user/avatar", upload.single("userAvatar"), (req, res) => {
  console.log("req", req.file);
  console.log("req.params", req.params);
  console.log("req.body", req.body);

  if (!req.file.mimetype.startsWith("image/")) {
    return res.status(422).json({
      error: "this file upload must be an image"
    });
  }
  // var dimensions = sizeOf(req.file.path);
  // if (dimensions.width < 640 || dimensions.height < 480) {
  //   return res.status(422).json({
  //     error: "The image must be at least 640 x 480px"
  //   });
  // }
  const user = {
    _id: "",
    avatar: ""
  };
  return res.status(200).send(req.file);
  // try {
  //   let isAvatarUpdated = await userModal.updateUserAvatar(user);
  //   if (isAvatarUpdated) {
  //     // return res.status(200).send(req.file);
  //     return res.status(200).send(req.file);
  //   }
  // } catch (err) {
  //   return res.status(500).send({ err: "Upload avatar failer" });
  // }
});

module.exports = router;
