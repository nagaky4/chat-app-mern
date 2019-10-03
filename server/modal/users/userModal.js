var mongoose = require("mongoose");
var q = require("q");

/**
 * User schema
 */
var userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, index: true, ref: "account.email" },
    profile: {
      firstName: String,
      lastName: { type: String, default: null },
      avatar: {
        type: String,
        default: "http://localhost:3000/public/images/user_default.png"
      },
      gender: { type: String, default: "" },
      age: { type: Number }
    },
    conversationIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    friendIDs: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        status: { type: Boolean, default: false }
      }
    ],
    status: { type: Boolean, default: false }
  },
  { timestamps: true }
);
const userModal = mongoose.model("users", userSchema);

/**
 * getAll user from database
 */

function getUsers() {
  var defer = q.defer();
  userModal.find(
    {},
    [],
    {
      sort: {
        createdAt: -1
      }
    },

    (err, data) => {
      if (err) {
        console.log("get all users err ", err);
        defer.reject(err);
      }
      defer.resolve(data);
    }
  );
  return defer.promise;
}

/**
 * find user by _id
 *  @param {Object} : _id of user
 */

function findUsersByID(_id) {
  var defer = q.defer();
  userModal.findOne({ _id: _id }, (err, data) => {
    if (err) {
      console.log("find users by _id err ", err);
      defer.reject(err);
    }
    defer.resolve(data);
  });
  return defer.promise;
}

/**
 * find user
 *  @param {String} -email : email of user
 *
 */

function findUserByEmail(email) {
  var defer = q.defer();
  userModal.findOne(
    {
      email: email
    },
    (err, data) => {
      if (err) {
        console.log("find users by _id err ", err);
        defer.reject(err);
      }
      defer.resolve(data);
    }
  );
  return defer.promise;
}

/**
 * find user by firstName, lastName or Email
 *  @param {String} -value : value to find
 *
 */

function findUserByValue(value) {
  var defer = q.defer();
  userModal.find(
    {
      $or: [
        { email: { $regex: value, $options: "i" } },
        {
          profile: {
            firstName: { $regex: value, $options: "i" }
          }
        },
        {
          profile: {
            lastName: { $regex: value, $options: "i" }
          }
        }
      ]
    },
    {
      _id: 1,
      email: 1,
      "profile.firstName": 1,
      "profile.lastName": 1,
      "profile.avatar": 1,
      "profile.gender": 1,
      "profile.age": 1
    },
    (err, data) => {
      if (err) {
        console.log("find users by value err ", err);
        defer.reject(err);
      }
      console.log("data", data);
      defer.resolve(data);
    }
  );
  return defer.promise;
}

/**
 * find all friends
 * find my friends
 * find require become friends
 * @param {ObjectId} idUser
 * @param {String} status : status of friends
 *
 */
function findFriends(idUser) {
  console.log(idUser);
  if (idUser) {
    var defer = q.defer();
    userModal
      .find(
        {
          _id: idUser
        },
        (err, data) => {
          if (err) defer.reject(err);
          console.log(data);
          defer.resolve(data);
        }
      )
      .populate("friendIDs.id");

    return defer.promise;
  }
  return false;
}

/**
 * insert one user into database
 * @param {text} - String : text of user
 */

function insertUser(email) {
  if (email) {
    var defer = q.defer();
    let user = {
      email: email,
      profile: {
        firstName: email.split("@")[0]
      }
    };
    userModal.create(user, (err, data) => {
      if (err) {
        console.log("err insert user err ", err);
        defer.reject(err);
      }
      defer.resolve(data);
    });
    return defer.promise;
  }
  return false;
}

/**
 * update user rely on _id
 * @param {user} - Object user { _id , text , status}
 */
function updateUser(user) {
  if (user) {
    var defer = q.defer();
    userModal.updateOne({ email: user.email }, user, (err, data) => {
      if (err) {
        console.log("err update user err ", err);
        defer.reject(err);
      }
      defer.resolve(data);
    });
    return defer.promise;
  }
  return false;
}

/**
 * update status user rely on _id
 * @param {user} - Object user { _id , status}
 */
function updateUserStatus(user) {
  if (user) {
    var defer = q.defer();
    userModal.updateOne(
      { _id: user._id },
      { status: user.status },
      (err, data) => {
        if (err) {
          console.log("update user status err ", err);
          defer.reject(err);
        }
        defer.resolve(data);
      }
    );
    return defer.promise;
  }
  return false;
}

/**
 * update status user rely on _id
 * @param {user} - Object user { _id , avatar}
 */
function updateUserAvatar(user) {
  if (user) {
    var defer = q.defer();
    userModal.updateOne(
      { email: user.email },
      { $set: { "profile.avatar": user.avatar } },
      (err, data) => {
        if (err) {
          console.log("update user avatar err ", err);
          defer.reject(err);
        }
        defer.resolve(data);
      }
    );
    return defer.promise;
  }
  return false;
}

/**
 * required become friend
 * add person id request ind person revice and have status : false (have friend yet)
 * @param {Object} - _idUser : _id user
 * @param {Object} - _idFriend : _id friend of user
 *
 */
function requiredFriend(_idUser, _idFriend) {
  if (_idUser && _idFriend) {
    var defer = q.defer();
    userModal.updateOne(
      { _id: _idFriend },
      {
        $push: {
          friendIDs: { id: _idUser, status: false }
        }
      },
      (err, data) => {
        if (err) {
          console.log("required become friend err ", err);
          defer.reject(err);
        }
        defer.resolve(data);
      }
    );
    return defer.promise;
  }
  return false;
}

/**
 * accept become friend
 * update status true with person id coresponding into friendIDs
 * @param {Object} - _idUser : _id user
 * @param {Object} - _idFriend : _id friend of user
 *
 */
function acceptFriend(_idUser, _idFriend) {
  if (_idUser && _idFriend) {
    var defer = q.defer();
    var p1 = userModal.updateOne(
      {
        _id: _idUser,
        friendIDs: {
          $elemMatch: {
            id: _idFriend
          }
        }
      },
      { $set: { "friendIDs.$.status": true } }
    );
    const myfriend = {
      id: _idUser,
      status: true
    };

    var p2 = userModal.updateOne(
      {
        _id: _idFriend
      },
      {
        $push: {
          friendIDs: myfriend
        }
      }
    );

    Promise.all([p1, p2]).then(
      values => {
        console.log(values);
        defer.resolve(values);
      },
      reason => {
        console.log(reason);
        defer.reject(reason);
      }
    );
    return defer.promise;
  }
  return false;
}

/**
 * add new friend
 * @param {Object} - _idUser : _id user
 * @param {Object} - _idFriend : _id friend of user
 *
 */
function addFriend(_idUser, _idFriend) {
  if (_idUser && _idFriend) {
    const friend = {
      id: _idFriend,
      status: true
    };
    var defer = q.defer();
    userModal.updateOne(
      { _id: _idUser },
      {
        $push: {
          friendIDs: friend
        }
      },
      (err, data) => {
        if (err) {
          console.log("add friend err ", err);
          defer.reject(err);
        }
        defer.resolve(data);
      }
    );
    return defer.promise;
  }
  return false;
}

/**
 * add new conversation
 * @param {Object} - _idUser : _id user
 * @param {Object} - _idFriend : _id friend of user
 *
 */
function addConversation(_idUser, _idFriend) {
  if (_idUser && _idFriend) {
    var defer = q.defer();
    userModal.updateOne(
      { _id: _idUser },
      {
        $push: {
          conversationIDs: _idFriend
        }
      },
      (err, data) => {
        if (err) {
          console.log("add conversation err ", err);
          defer.reject(err);
        }
        defer.resolve(data);
      }
    );
    return defer.promise;
  }
  return false;
}

/**
 * delete user rely on _id
 * @param {user} - Object user {_id}
 */
function deleteUser(_id) {
  if (_id) {
    var defer = q.defer();
    userModal.deleteOne({ _id: _id }, (err, data) => {
      if (err) {
        console.log("err delete user err", err);
        defer.reject(err);
      }
      defer.resolve(data);
    });
    return defer.promise;
  }
  return false;
}
module.exports = {
  getUsers,
  findUsersByID,
  findUserByEmail,
  findUserByValue,
  insertUser,
  updateUser,
  updateUserStatus,
  updateUserAvatar,
  findFriends,
  requiredFriend,
  acceptFriend,
  addFriend,
  addConversation,
  deleteUser
};
