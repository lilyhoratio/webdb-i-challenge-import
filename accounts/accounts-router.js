const express = require("express");
const Accounts = require("./accounts-model");
const accountsHelpers = require("./accounts-helpers");

const router = express.Router();

// ACCOUNT ENDPOINTS
// ================================================

// READ ACCOUNTS - done
router.get(`/`, async (req, res) => {
  try {
    // const accounts = Accounts.find(); // here, accounts is the promise
    const accounts = await Accounts.find(); // with await, accounts is the array of accounts
    res.status(200).json(accounts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error getting accounts" });
  }
});

// READ AN ACCOUNT - done (helper function - WIP)
router.get(`/:id`, async (req, res) => {
  const { id } = req.params;

  // ERROR WITH HELPER FUNCTION
  // if (accountsHelpers.doesAccountExist(id)) {
  try {
    const account = await Accounts.findById(id);
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: `Account ${id} does not exist.` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error getting account" });
  }
  // } else {
  //   res.status(400).json({ message: `Account ${id} does not exist.` });
  // }
});

// CREATE AN ACCOUNT - done
router.post(`/`, async (req, res) => {
  const accountData = req.body;

  // validate data before insertion
  if (accountsHelpers.isAccountValid(accountData)) {
    try {
      const newAccount = await Accounts.insert(accountData);
      console.log(newAccount);
      res.status(200).json(newAccount);
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: "Server error adding account" });
    }
  } else {
    res
      .status(400)
      .json({ message: `Provide a name (string) and valid budget (number).` });
  }
});

// UPDATE AN ACCOUNT (helper function - WIP, return updated account - WIP)
router.put(`/:id`, async (req, res) => {
  const accountId = req.params.id;
  const updatedAccount = req.body;

  // if (!accountsHelpers.doesAccountExist(accountId)) {
  //   console.log("ACCOUNT DOESN'T EXIST");
  //   res.status(404).json({ error: `account ${accountId} does not exist!` });
  // }

  if (!accountsHelpers.isAccountValid(updatedAccount)) {
    res
      .status(400)
      .json({ message: `Provide a name (string) and valid budget (number).` });
  }

  try {
    const updatedCount = await Accounts.update(accountId, updatedAccount);

    if (updatedCount) {
      res.status(200).json({ message: `${updatedCount} account(s) updated` });
    } else {
      res.status(500).json({ message: `Account ${accountId} not found` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Server error updating record" });
  }
});

// DELETE AN ACCOUNT (using middleware - done , refactor with account helper - WIP)
router.delete(`/:id`, validateAccountId, async (req, res) => {
  // delete from posts where
  const accountId = req.params.id;

  try {
    const deletedCount = await Accounts.remove(accountId);
    res.status(200).json({ message: `deleted ${deletedCount} accounts` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Server error deleting record" });
  }
});

// CUSTOM MIDDLEWARE
function validateAccountId(req, res, next) {
  const accountId = req.params.id;
  Accounts.findById(accountId)
    .then(account => {
      if (account) {
        req.account = account;
        next();
      } else {
        res.status(404).json({ error: `account ${accountId} does not exist!` });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: `account ${accountId} could not be retrieved` });
    });
}

module.exports = router;
