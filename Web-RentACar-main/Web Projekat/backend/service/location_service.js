const repo = require("../repository/location_repository.js");

function getAll() {
  return repo.getAll();
}

function getById(id) {
  return repo.getById(id);
}

module.exports = {
  getAll,
  getById,
};
