const filePath = require('path');

const path = filePath.join(__dirname, '../data/comments.json');
const json_utils = require("../utils/json_utils.js");

function create(object) {
    const comments = json_utils.jsonReader(path);
    object.id = json_utils.generateNextId(comments);
  
    comments.push(object);
    json_utils.saveDataToFile(comments, path);
}
  
function update(id, updatedComment) {
    const comments = json_utils.jsonReader(path);
    index = comments.findIndex((object) => object.id === id);
    comments[index] = updatedComment;
    json_utils.saveDataToFile(comments, path);
}
  
function remove(id) {
    const comments = json_utils.jsonReader(path);
    index = comments.findIndex((object) => object.id === id);
    comments.pop(index);
    json_utils.saveDataToFile(comments, path);
}
  
function getAll() {
    return json_utils.jsonReader(path);
}
  
function getById(id) {
    const comments = json_utils.jsonReader(path);
    index = comments.findIndex((object) => object.id === id);
    return comments[index];
}
  
  module.exports = { create, update, remove, getAll, getById };