var mongoose = require("mongoose");
var q = require("q");

/**
 * Account schema
 */
var accountSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, index: true },
    password: String,
    status: { type: Boolean, default: false }
  },
  { timestamps: true }
);
const accountModal = mongoose.model("accounts", accountSchema);

/**
 * getAll account from database
 */

function getAccounts() {
  var defer = q.defer();
  accountModal.find(
    {},
    [],
    {
      sort: {
        createdAt: -1
      }
    },

    (err, data) => {
      if (err) {
        console.log("get all accounts err ", err);
        defer.reject(err);
      }
      defer.resolve(data);
    }
  );
  return defer.promise;
}

/**
 * find account by _id
 *  @param {Object} : _id of account
 */

function findAccountsByID(_id) {
  var defer = q.defer();
  accountModal.findOne({ _id: _id }, (err, data) => {
    if (err) {
      console.log("find accounts by _id err ", err);
      defer.reject(err);
    }
    defer.resolve(data);
  });
  return defer.promise;
}

/**
 * find account
 *  @param {String} -email : email of account
 *  @param {String} -password : password of account
 *
 */

function findAccountByEmail(email, password) {
  var defer = q.defer();
  accountModal.findOne({ email: email }, (err, data) => {
    if (err) {
      console.log("find accounts by _id err ", err);
      defer.reject(err);
    }
    defer.resolve(data);
  });
  return defer.promise;
}

/**
 * insert one account into database
 * @param {text} - String : text of account
 */

function insertAccount(account) {
  if (account) {
    var defer = q.defer();
    accountModal.create(account, (err, data) => {
      if (err) {
        console.log("err insert account err ", err);
        defer.reject(err);
      }
      defer.resolve(data);
    });
    return defer.promise;
  }
  return false;
}

/**
 * update account rely on _id
 * @param {account} - Object account { _id , text , status}
 */
function updateAccount(account) {
  if (account) {
    var defer = q.defer();
    accountModal.updateOne({ _id: account._id }, account, (err, data) => {
      if (err) {
        console.log("err update account err ", err);
        defer.reject(err);
      }
      defer.resolve(data);
    });
    return defer.promise;
  }
  return false;
}

/**
 * update status account rely on _id
 * @param {account} - Object account { _id , status}
 */
function updateAccountStatus(account) {
  if (account) {
    var defer = q.defer();
    accountModal.updateOne(
      { _id: account._id },
      { status: account.status },
      (err, data) => {
        if (err) {
          console.log("update account status err ", err);
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
 * delete account rely on _id
 * @param {account} - Object account {_id}
 */
function deleteAccount(_id) {
  if (_id) {
    var defer = q.defer();
    accountModal.deleteOne({ _id: _id }, (err, data) => {
      if (err) {
        console.log("err delete account err", err);
        defer.reject(err);
      }
      defer.resolve(data);
    });
    return defer.promise;
  }
  return false;
}
module.exports = {
  getAccounts,
  findAccountsByID,
  findAccountByEmail,
  insertAccount,
  updateAccount,
  updateAccountStatus,
  deleteAccount
};
