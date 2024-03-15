const vehicleRepository = require("../repository/vehicle_repository");

function getAll() {
    return vehicleRepository.getAll();
}

function getById(vehicleId) {
    return vehicleRepository.getById(vehicleId);
}

function create(vehicle) {
    const savedVehicle = vehicleRepository.create(vehicle);
    return savedVehicle;
}

function remove(vehicleId) {
    vehicleRepository.remove(vehicleId);
    return vehicleId;
}

function update(vehicleId, updatedVehicle) {
    const savedVehicle = vehicleRepository.update(vehicleId, updatedVehicle);
    return savedVehicle;
}

function rentVehicles(vehicles){
    console.log('Usao u vehicle service rent');
    vehicles.forEach((vehicle) => {
      vehicle.status = "Rented";
      update(vehicle.id, vehicle);
    })
}

function returnVehicles(vehicles){
    console.log('Usao u vehicle service return');
    vehicles.forEach((vehicle) =>{
      vehicle.status = "Available";
      update(vehicle.id, vehicle);
    })
}

function makeVehiclesAvailable(vehicles){
    console.log('Usao u vehicle service make available');
    vehicles.forEach((vehicle) =>{
      vehicle.status = "Available";
      update(vehicle.id, vehicle);
    })
  }
  

module.exports = { getAll, getById, create, remove, update, rentVehicles, returnVehicles, makeVehiclesAvailable };