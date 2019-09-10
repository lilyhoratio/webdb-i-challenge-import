const express = require("express");
const Accounts = require("./accounts-model");
const accountsHelpers = require("./accounts-helpers");

const router = express.Router();

// ACCOUNT ENDPOINTS
// ================================================

// READ ACCOUNTS
router.get(`/`, async (req, res) => {
  try {
    // const accounts = Accounts.find(); // here, accounts is the promise
    const accounts = await Accounts.find(); // with await, accounts is the array of accounts
    res.status(200).json(accounts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error getting accounts" });
  }
});

// READ AN ACCOUNT
router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    // const accounts = Accounts.find(); // here, accounts is the promise
    const account = await Accounts.findById(id); // with await, accounts is the array of accounts
    res.status(200).json(account);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error getting account" });
  }
});

// CREATE AN ACCOUNT
router.post(`/`, async (req, res) => {
  const accountData = req.body;

  // validate data before insertion
  if (accountsHelpers.isAccountValid(req.body)) {
    try {
      const newAccount = await Accounts.insert(accountData);
      console.log(newAccount);
      res.status(200).json(newAccount);
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: "error adding account" });
    }
  } else {
    res
      .status(400)
      .json({ message: `Provide a name (string) and valid budget (number).` });
  }
});

module.exports = router;
