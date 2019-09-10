const db = require("../data/dbConfig");

function find() {
  return db("accounts");
}

function findById(id) {
  return db("accounts")
    .where({ id })
    .first();
}

// function insert(accountData, id) {
//   return db("accounts")
//     .insert(accountData) // returns id of last record inserted, even if you insert an array of multiple objects (knex specific)
//     .then(([id]) => {
//       // destructuring  - from array you get back, grabbing the id
//       return findById(id);
//     });
// }

// using async/await
// async function insert(accountData, id) { // when to pass in id?
async function insert(accountData) {
  const [id] = await db("accounts").insert(accountData);
  return findById(id);
}

module.exports = {
  find,
  findById,
  insert
};
