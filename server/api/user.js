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
  if (req.query.hasOwnProperty("find")) {
    const value = req.query.find;
    if (value) {
      userModal
        .findUserByValue(value)
        .then(data => {
          return res.status(200).json(data);
        })
        .catch(err => {
          console.log("err", err);
          return res.status(500).json({ errorMess: "Internal Server Error " });
        });
    } else return res.status(200).json([]);
  } else
    userModal
      .getUsers()
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err =>
        res.status(500).json({ errorMess: "Internal Server Error" })
      );
});

router.get("/user/:email", (req, res) => {
  var email = req.params.email;
  if (email)
    userModal
      .findUserByEmail(email)
      .then(data => {
        console.log("data find by email", data);
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json({ errorMess: "Internal Server Error " });
      });
  else res.status(400).json({ errorMess: "no emaill" });
});

router
  .route("/user")
  .put((req, res) => {
    var user = req.body.user;
    console.log("user", user);
    if (user) {
      userModal
        .updateUser(user)
        .then(data =>
          res.status(200).json({ successMess: "Update user successfully!" })
        )
        .catch(err =>
          res.status(500).json({ errorMess: "Internal Server Error " })
        );
    } else {
      return res.status(400).json({ errorMess: "bad request" });
    }
  })
  .patch((req, res) => {
    var user = req.body.user;
    if (user) {
      userModal
        .updateUserStatus(user)
        .then(data =>
          res.status(200).json({ successMess: "update user successfully!" })
        )
        .catch(err =>
          res.status(500).json({ errorMess: "Internal Server Error " })
        );
    } else {
      return res.status(400).json({ errorMess: "bad request" });
    }
  })
  .delete((req, res) => {
    var _id = req.body._id;
    if (_id) {
      userModal
        .deleteUser(_id)
        .then(data => res.status(200).json({ successMess: "User have dleted" }))
        .catch(err =>
          res.status(500).json({ errorMess: "Internal Server Error " })
        );
    } else {
      return res.status(400).json({ errorMess: "bad request" });
    }
  });

router.post("/user/avatar", upload.single("userAvatar"), async (req, res) => {
  if (!req.file.mimetype.startsWith("image/")) {
    return res.status(422).json({
      errorMess: "this file upload must be an image"
    });
  }
  try {
    await userModal
      .findUserByEmail(req.body.email)
      .then(data => {
        var avatar = data.profile.avatar;
        if (avatar && avatar.length > 0) {
          var filename = avatar.split("/").pop();
          var dir = path.join(__dirname, `../public/images/user/${filename}`);
          if (dir) {
            try {
              fs.unlinkSync(dir);
            } catch (err) {
              console.error("err remove image", err);
            }
          }
        }
      })
      .catch(err => {
        console.log("error find avatar user", err);
      });

    const user = {
      email: req.body.email,
      avatar: `${req.protocol}://${req.get("host")}/images/user/${
        req.file.filename
      }`
    };

    let isAvatarUpdated = await userModal.updateUserAvatar(user);
    if (isAvatarUpdated) {
      return res
        .status(200)
        .json({ successMess: "upload avatar successfully" });
    }
  } catch (err) {
    return res.status(500).send({ errorMess: "Internal Server Error " });
  }
});

/**
 * get list friend of user
 * req.query = { idUser}
 */
router.get("/user-friends", (req, res) => {
  if (req.query.hasOwnProperty("idUser")) {
    const idUser = req.query.idUser;
    userModal
      .findFriends(idUser)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        console.log("err", err);
        res.status(500).send({ errorMess: "Internal Server Error " });
      });
  } else return res.status(400).json({ errorMess: "Bad request" });
});

/**
 * require become friend each other
 * req.body = { idUser , idFriend}
 */
router.post("/user/friend", (req, res) => {
  console.log("cái đât");
  const idUser = req.body.idUser;
  const idFriend = req.body.idFriend;

  userModal
    .requiredFriend(idUser, idFriend)
    .then(data => {
      console.log(data);
      return res
        .status(200)
        .json({ successMess: "require becom friend success " });
    })
    .catch(err => {
      console.log("err", err);
      return res
        .status(500)
        .json({ errorMess: "require become friend failer" });
    });
});

/**
 * accept friend each other
 * req.body = { idUser , idFriend}
 */
router.post("/user/accept-friend", (req, res) => {
  const idUser = req.body.idUser;
  const idFriend = req.body.idFriend;
  userModal
    .acceptFriend(idUser, idFriend)
    .then(data => {
      console.log(data);
      return res
        .status(200)
        .json({ successMess: "accept becom friend success " });
    })
    .catch(err => {
      console.log("err", err);
      return res.status(500).json({ errorMess: "accept become friend failer" });
    });
});

module.exports = router;
