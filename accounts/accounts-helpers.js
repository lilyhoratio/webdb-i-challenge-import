const Accounts = require("./accounts-model");

function isAccountValid({ name, budget }) {
  return name && typeof name === "string" && typeof budget === "number";
}

async function doesAccountExist(id) {
  // console.log(await Accounts.findById(id));
  try {
    return await Accounts.findById(id);
  } catch (err) {
    return false;
  }
  // return await Accounts.findById(id); // account or undefined
}

module.exports = {
  isAccountValid,
  doesAccountExist
};
