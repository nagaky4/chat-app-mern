var express = require("express");
var router = express.Router();

var accountModal = require("../modal/account/accountModal");

/* GET home page. */

router.get("/accounts", (req, res) => {
  accountModal
    .getAccounts()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => res.status(500).json(err));
});

router
  .route("/account")
  .put((req, res) => {
    var account = req.body.account;
    console.log("account", account);
    if (account) {
      accountModal
        .updateAccount(account)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
      return res.status(400).json({ error: "bad request" });
    }
  })
  .patch((req, res) => {
    var account = req.body.account;
    if (account) {
      accountModal
        .updateAccountStatus(account)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
      return res.status(400).json({ error: "bad request" });
    }
  })
  .delete((req, res) => {
    var _id = req.body._id;
    if (_id) {
      accountModal
        .deleteAccount(_id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    } else {
      return res.status(400).json({ error: "bad request" });
    }
  });

module.exports = router;
