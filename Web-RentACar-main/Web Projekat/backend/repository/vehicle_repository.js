const filePath = require('path');

const path = filePath.join(__dirname, '../data/vehicles.json');
const json_utils = require("../utils/json_utils.js");


function getAll() {
    return json_utils.jsonReader(path);
}
  
function getById(vehicleId) {
    const vehicles = json_utils.jsonReader(path);
    index = vehicles.findIndex((vehicle) => vehicle.id === vehicleId);
    return vehicles[index];
}

function create(vehicle) {
    const vehicles = json_utils.jsonReader(path);
    vehicle.id = json_utils.generateNextId(vehicles);
    vehicles.push(vehicle);
    json_utils.saveDataToFile(vehicles, path);
    return vehicle;
}

function remove(vehicleId) {
    const vehicles = json_utils.jsonReader(path);
    const index = vehicles.findIndex((vehicle) => vehicle.id === vehicleId);
    if (index !== -1) {
      vehicles.splice(index, 1);
      json_utils.saveDataToFile(vehicles, path);
    }
}
  
function update(vehicleId, updatedVehicle) {
    const vehicles = json_utils.jsonReader(path);
    index = vehicles.findIndex((object) => object.id === vehicleId);
    vehicles[index].brand = updatedVehicle.brand;
    vehicles[index].model = updatedVehicle.model;
    vehicles[index].price= updatedVehicle.price;
    vehicles[index].vehicleType=updatedVehicle.vehicleType;
    vehicles[index].transmissionType= updatedVehicle.transmissionType;
    vehicles[index].fuelType = updatedVehicle.fuelType;
    vehicles[index].consumption = updatedVehicle.consumption;
    vehicles[index].doorNumber= updatedVehicle.doorNumber;
    vehicles[index].personNumber= updatedVehicle.personNumber;
    vehicles[index].description= updatedVehicle.description;
    vehicles[index].image = updatedVehicle.image;
    vehicles[index].status = updatedVehicle.status;
    json_utils.saveDataToFile(vehicles, path);
    return vehicles[index];
}
  
module.exports = { getAll, getById, create, remove, update };