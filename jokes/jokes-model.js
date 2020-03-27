const db = require("../database/dbConfig");

function add(user) {
  return db("users").insert(user, "id");
}

function findBy(user) {
  return db("users").where(user);
}

function find() {
  return db("users");
}

module.exports = {
  add,
  findBy,
  find
};
