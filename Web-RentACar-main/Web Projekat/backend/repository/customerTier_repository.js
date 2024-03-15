const filePath = require('path');

const path = filePath.join(__dirname, '../data/customerTiers.json');
const json_utils = require("../utils/json_utils.js");


function create(type) {
  const types = json_utils.jsonReader(path);
  type.id = json_utils.generateNextId(types);

  types.push(type);
  json_utils.saveDataToFile(types, path);
}

function update(id, type) {
  const types = json_utils.jsonReader(path);
  index = types.findIndex((object) => object.id === id);
  types[index] = type;
  json_utils.saveDataToFile(types, path);
}

function remove(id) {
  const types = json_utils.jsonReader(path);
  index = types.findIndex((object) => object.id === id);
  types.pop(index);
  json_utils.saveDataToFile(types, path);
}

function getAll() {
  return json_utils.jsonReader(path);
}

function getById(id) {
  const types = json_utils.jsonReader(path);
  index = types.findIndex((object) => object.id === id);
  return types[index];
}

module.exports = { create, update, remove, getAll, getById };