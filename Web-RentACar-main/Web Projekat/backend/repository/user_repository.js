//const path = "../data/users.json";
const filePath = require('path');

const path = filePath.join(__dirname, '../data/users.json');
const json_utils = require("../utils/json_utils.js");

function create(user){ 
    const users = json_utils.jsonReader(path);
    user.id = json_utils.generateNextId(users);
    users.push(user);
    json_utils.saveDataToFile(users, path);
}

function update(id, updatedUser){
    const users = json_utils.jsonReader(path);
    index = users.findIndex((user) => user.id === id);
    updatedUser.id = id;
    users[index] = updatedUser;
    json_utils.saveDataToFile(users, path);
    return users[index];
}

function remove(id){
    const users = json_utils.jsonReader(path);
    index = users.findIndex((user) => user.id === id);
    users.pop(index);
    json_utils.saveDataToFile(users, path);
}

function getAll()
{
    return json_utils.jsonReader(path);
}

function getByUsername(username){
    const users = json_utils.jsonReader(path);
    index = users.findIndex((user) => user.username === username);
    return users[index];
}

function getById(id){
    const users = json_utils.jsonReader(path);
    index = users.findIndex((user) => user.id === id);
    return users[index];
}

function update(id, updatedUser){
    const users = json_utils.jsonReader(path);
    index = users.findIndex((user) => user.id === id);
    updatedUser.id = id;
    users[index] = updatedUser;
    json_utils.saveDataToFile(users, path);
}

function existing(loggedInUser){
    const users = json_utils.jsonReader(path);
    return users.find((user) => user.username === loggedInUser.username & user.password === loggedInUser.password);
}

module.exports = { create, remove, update, getAll, getById, getByUsername, existing }