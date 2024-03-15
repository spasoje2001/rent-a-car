const filePath = require('path');

const path = filePath.join(__dirname, '../data/baskets.json');
const json_utils = require("../utils/json_utils.js");

function getAll() {
    return json_utils.jsonReader(path);
}
  
function getById(basketId) {
    const baskets = json_utils.jsonReader(path);
    index = baskets.findIndex((basket) => basket.id === basketId);
    return baskets[index];
}

function create(basket) {
    const baskets = json_utils.jsonReader(path);
    basket.id = json_utils.generateNextId(baskets);
  
    baskets.push(basket);
    json_utils.saveDataToFile(baskets, path);
}

function remove(basketId) {
    const baskets = json_utils.jsonReader(path);
    index = baskets.findIndex((basket) => basket.id === basketId);
    baskets.pop(index);
    json_utils.saveDataToFile(baskets, path);
}

function update(basketId, updatedBasket) {
    const baskets = json_utils.jsonReader(path);
    index = baskets.findIndex((basket) => basket.id === basketId);
    baskets[index] = updatedBasket;
    json_utils.saveDataToFile(baskets, path);
}

module.exports = { getAll, getById, create, remove, update };
