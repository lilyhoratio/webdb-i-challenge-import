const db = require("../data/dbConfig");

function find() {
  return db("accounts");
}

function findById(id) {
  return db("accounts")
    .where({ id })
    .first();
}

// function insert(newAccount, id) {
//   return db("accounts")
//     .insert(newAccount) // returns id of last record inserted, even if you insert an array of multiple objects (knex specific)
//     .then(([id]) => {
//       // destructuring  - from array you get back, grabbing the id
//       return findById(id);
//     });
// }

// using async/await
// async function insert(newAccount, id) { // when to pass in id?
async function insert(newAccount) {
  const [id] = await db("accounts").insert(newAccount);
  return findById(id);
}

//insert multiple accounts

function update(id, updatedAccount) {
  return db("accounts")
    .where({ id })
    .update(updatedAccount, "*");
}

function remove(id) {
  return db("accounts")
    .where({ id })
    .delete();
}

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};
