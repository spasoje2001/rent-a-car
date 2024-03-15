const rentacarRepository = require("../repository/rentacar_repository");
const orderService = require("./order_service");
const vehicleService = require("./vehicle_service");

function getAll() {
    return rentacarRepository.getAll();
}
  
function getById(id) {
    return rentacarRepository.getById(id);
}

function getAvailable(dateFrom, dateTo) {
    let objects = rentacarRepository.getAll();
    console.log("before binding");
    const bindedObjects = BindVehicles(objects);
    console.log("after binding");
    console.log(bindedObjects);
    const willBeAvailable = orderService.getAvailableVehichles(dateFrom, dateTo);
    console.log("will be: ", willBeAvailable.length);
    const availableObjects = [];
    console.log(willBeAvailable);
  
    bindedObjects.forEach((object) => {
      const availableVehcles = [];
      object.vehicles.forEach((vehicle) => {
        if (vehicle.status === "Available") {
            availableVehcles.push(vehicle);
        }
      });
      willBeAvailable.forEach((newVehicle) => {
        console.log("price of new vehicle:", newVehicle.price);
        console.log("new veh object", newVehicle.rentacarId, "object id", object.id);
        if (newVehicle.object == object.id) {
            availableVehcles.push(newVehicle);
        }
      });
      if (availableVehcles.length != 0) {
        object.vehicles = availableVehcles;
        availableObjects.push(object);
      }
    });
    
  
    return availableObjects;
}

function create(object) {
  const newObject = {
    name: object.name,
    vehicles: [],
    workingStatus: "Working",
    location: object.selectedLocation,
    businessHours: object.businessHours,
    location: object.location,
    logo: object.logoPath,
    rating: 10,
    gradeNum: 0,
  };
  return rentacarRepository.create(newObject); 
}

function remove(object) {
    rentacarRepository.remove(object);
}

function update(id, updatedObject) {
    rentacarRepository.update(id, updatedObject);
}

function gradeAdded(id, grade){
   let object = rentacarRepository.getById(id);
   console.log("object grade:", object.grade);
   console.log("grade:", grade)
   let sum = object.grade * object.gradeNum + grade;
   console.log("sum", sum);
   object.gradeNum += 1;
   object.grade = sum / object.gradeNum;
   update(id, object);
}

function vehicleAdded(id, vehicle){
  console.log("6");
  let newVehicle = vehicleService.create(vehicle);
  console.log("3");
  const rentalCar = rentacarRepository.getById(id);
  console.log("4");
  rentalCar.vehicles.push(newVehicle);
  console.log("6");
  update(id, rentalCar);
}

function vehicleUpdated(vehicleId,carId,updatedData){
  let updatedVehicle = vehicleService.update(vehicleId, updatedData);
  const rentalCar = rentacarRepository.getById(carId);
  let index = -1;

  for (let i = 0; i < rentalCar.vehicles.length; i++) {
    if (rentalCar.vehicles[i].id === vehicleId) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    rentalCar.vehicles[index] = updatedVehicle;
    rentacarRepository.update(carId, rentalCar);
  }
}

function removeVehicle(vehicleId, carId){
     vehicleService.remove(vehicleId);
     const rentalCar = rentacarRepository.getById(carId);
     let index = -1;
     for (let i = 0; i < rentalCar.vehicles.length; i++) {
      
       if (rentalCar.vehicles[i].id === vehicleId) {
         index = i;
         break;
       }
     }
     if (index !== -1) {
       rentalCar.vehicles.splice(index, 1);
       rentacarRepository.update(carId, rentalCar);
     }

}

function BindVehicles(availableObjects) {
  console.log("uslo u bind");
  let bindedVehicles = [];
  let bindedObjects = [];
  availableObjects.forEach((object) => {
    object.vehicles.forEach((vehicle) => {
      bindedVehicles.push(
        vehicleService
          .getAll()
          .find((newVehicle) => newVehicle.id === vehicle.id)
      );
    });
    
    object.vehicles = bindedVehicles;
    console.log(object.vehicles);
    bindedVehicles = [];
    bindedObjects.push(object);
  });
  return bindedObjects;
}


function getSearchedObjects(name, vehichleType, locationName, grade) {
  const objects = rentacarRepository.getAll();
  let sortedObjects = [];

  objects.forEach((obj) => {
    if (
      (name === "" || obj.name === name) &&
      (vehichleType === "" || obj.vehicleType === vehicleType) &&
      (locationName === "" ||
        obj.locationName.toLowerCase().includes(locationName.toLowerCase())) &&
      (grade === "" || obj.grade === parseFloat(grade))
    ) {
      sortedObjects.push(obj);
    }
  });
  return sortedObjects;
}

function getFilteredObjects(transmissionType, fuelType) {
  const objects = rentacarRepository.getAll();
  let filteredObjects = [];

  objects.forEach((obj) => {
    let hasMatchingVehicle = false;

    if (obj.vehicles !== null) {
      obj.vehicles.forEach((veh) => {
        if (
          (transmissionType === "" || veh.transmissionType === transmissionType) &&
          (fuelType === "" || veh.fuelType === fuelType)
        ) {
          hasMatchingVehicle = true;
        }
      });
    }

    if (hasMatchingVehicle) {
      filteredObjects.push(obj);
    }
  });

  return filteredObjects;
}

function getSortedAsc(sortingParam) {
  const objects = rentacarRepository.getAll();
  if (sortingParam === "grade") {
    objects.sort((a, b) => a.grade - b.grade);
    return objects;
  } else if (sortingParam === "location") {
    objects.sort((a, b) => {
      const locationA = a.location.address.city.toLowerCase();
      const locationB = b.location.address.city.toLowerCase();

      if (locationA < locationB) {
        return -1;
      } else if (locationA > locationB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  } else {
    objects.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  }
}

function getSortedDesc(sortingParam) {
  const objects = rentacarRepository.getAll();
  if (sortingParam === "grade") {
    objects.sort((a, b) => b.grade - a.grade);
    return objects;
  } else if (sortingParam === "location") {
    objects.sort((a, b) => {
      const locationA = a.location.address.city.toLowerCase();
      const locationB = b.location.address.city.toLowerCase();

      if (locationA > locationB) {
        return -1;
      } else if (locationA < locationB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  } else {
    objects.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA > nameB) {
        return -1;
      } else if (nameA < nameB) {
        return 1;
      } else {
        return 0;
      }
    });

    return objects;
  }
}

function getSortedCars() {
  const cars = rentacarRepository.getAll();

  const WorkStatus = {
    ON: "Opened",
    OFF: "Closed",
  };

  const sortedCars = cars.sort((a, b) => {
    // Checking if both cars are in the enum as "Working"
    const isAWorking = a.objectStatus === WorkStatus.ON;
    const isBWorking = b.objectStatus === WorkStatus.ON;

    // Sorting logic
    if (isAWorking && !isBWorking) {
      return -1; // a comes before b
    } else if (!isAWorking && isBWorking) {
      return 1; // b comes before a
    } else {
      return 0; // the order remains the same
    }
  });

  return sortedCars;
}



module.exports = {
  create,
  remove,
  getAll,
  getById,
  update,
  getSortedCars,
  getSearchedObjects,
  getFilteredObjects,
  getSortedAsc,
  getSortedDesc,
  getAvailable,
  vehicleAdded,
  vehicleUpdated,
  removeVehicle,
  gradeAdded
};
