const filePath = require('path');

const path = filePath.join(__dirname, '../data/rentacars.json');
const json_utils = require("../utils/json_utils.js");

function getAll() {
    return json_utils.jsonReader(path);
}
  
function getById(rentacarId) {
    const rentacars = json_utils.jsonReader(path);
    index = rentacars.findIndex((object) => object.id === rentacarId);
    console.log(rentacars[index]);
    return rentacars[index];
}

function create(rentacar) {
    const rentacars = json_utils.jsonReader(path);
    rentacar.id = json_utils.generateNextId(rentacars);
    rentacars.push(rentacar);
    json_utils.saveDataToFile(rentacars, path);
    return rentacar;
}
  
  function update(rentacarId, updatedRentacar) {
    const rentacars = json_utils.jsonReader(path);
    index = rentacars.findIndex((rentacar) => rentacar.id === rentacarId);
    console.log("6");
    rentacars[index] = updatedRentacar;
    json_utils.saveDataToFile(rentacars, path);
  }
  
  function remove(rentacarId) {
    const rentacars = json_utils.jsonReader(path);
    index = rentacars.findIndex((rentacar) => rentacar.id === rentacarId);
    rentacars.pop(index);
    json_utils.saveDataToFile(rentacars, path);
  }
  
  
  
  module.exports = { create, update, remove, getAll, getById };