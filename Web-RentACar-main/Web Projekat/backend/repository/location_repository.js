const filePath = require('path');
const path = filePath.join(__dirname, '../data/locations.json');
const json_utils = require("../utils/json_utils.js");

function getAll(){
    return json_utils.jsonReader(path);
}

function getById(id){
    const locations = json_utils.jsonReader(path);
    index = locations.findIndex((location) => location.id === id);
    return locations[id];
}

module.exports = { getAll, getById };