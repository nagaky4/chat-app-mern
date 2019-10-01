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
      gender: { type: String, default: "" }
    },
    conversationIDs: [
      { type: mongoose.Schema.Types.ObjectId, ref: "accounts._id" }
    ],
    friendIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "users._id" }],
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
 *  @param {String} -password : password of user
 *
 */

function findUserByEmail(email, password) {
  var defer = q.defer();
  userModal.findOne({ email: email }, (err, data) => {
    if (err) {
      console.log("find users by _id err ", err);
      defer.reject(err);
    }
    defer.resolve(data);
  });
  return defer.promise;
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
    userModal.updateOne({ _id: user._id }, user, (err, data) => {
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
 * add new friend
 * @param {Object} - _idUser : _id user
 * @param {Object} - _idFriend : _id friend of user
 *
 */
function addFriend(_idUser, _idFriend) {
  if (_idUser && _idFriend) {
    var defer = q.defer();
    userModal.updateOne(
      { _id: _idUser },
      {
        $push: {
          friendIDs: _idFriend
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
  insertUser,
  updateUser,
  updateUserStatus,
  updateUserAvatar,
  addFriend,
  addConversation,
  deleteUser
};
