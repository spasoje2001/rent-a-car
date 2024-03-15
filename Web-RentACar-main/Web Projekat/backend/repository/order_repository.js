const filePath = require('path');

const path = filePath.join(__dirname, '../data/orders.json');
const json_utils = require("../utils/json_utils.js");

function getAll() {
    return json_utils.jsonReader(path);
}

function getById(orderId) {
    const orders = json_utils.jsonReader(path);
    index = orders.findIndex((order) => order.id === orderId);
    return orders[index];
}

function create(order) {
  const orders = json_utils.jsonReader(path);
  order.id = json_utils.generateNextId(orders);
  orders.push(order);
  json_utils.saveDataToFile(orders, path);
  return order;
}

function remove(orderId) {
    const orders = json_utils.jsonReader(path);
    index = orders.findIndex((order) => order.id === orderId);
    orders.pop(index);
    json_utils.saveDataToFile(orders, path);
  }

function update(orderId, updatedOrder) {
  const orders = json_utils.jsonReader(path);
  index = orders.findIndex((order) => order.id === orderId);
  orders[index] = updatedOrder;
  json_utils.saveDataToFile(orders, path);
}


module.exports = { getAll, getById, create, remove, update };