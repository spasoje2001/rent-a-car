const userRepository = require("../repository/user_repository.js");
const customerTierService = require("./customerTier_service");

function create(user)
{
    const userId = userRepository.create(user);
    return userId;
}

function update(id, user)
{
    userRepository.update(id, user);
}

function remove(id)
{
    userRepository.remove(id);
}

function getAll()
{
    return userRepository.getAll();
}

function getById(id)
{
    return userRepository.getById(id);
}

function getByUsername(username)
{
    return userRepository.getByUsername(username);
}

function addOrder(order) {
    console.log("Usao kod usera");
    console.log(order.rentACar)
    const user = getById(order.customer.id);
    let vehicleIds = [];
    order.rentedVehicles.forEach((veh) => {
      vehicleIds.push({ id: veh.id} );
    })
    let newOrder = {
      id: order.id,
      rentedVehicles: vehicleIds,
      rentACar: order.rentACar,
      status: order.status,
    };
    console.log(order.price);
    user.numberOfPoints += (order.price / 1000) * 133;
    console.log("points: ", user.numberOfPoints);
    user.customerTier = customerTierService.getTypeByPoints(user.numberOfPoints);
    console.log(user.customerTier);
    user.myRentals.push(newOrder);
    console.log(user.myRentals);
    userRepository.update(user.id, user);
  
}

function getSortedAsc(sortingParam) {
    const objects = userRepository.getAll();
    console.log(sortingParam);
    if (sortingParam === "name") {
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
    } else if (sortingParam === "surname") {
      objects.sort((a, b) => {
        const lastNameA = a.surname.toLowerCase();
        const lastNameB = b.surname.toLowerCase();
  
        if (lastNameA < lastNameB) {
          return -1;
        } else if (lastNameA > lastNameB) {
          return 1;
        } else {
          return 0;
        }
      });
  
      return objects;
    } else if (sortingParam === "userName"){
      objects.sort((a, b) => {
        const userNameA = a.username.toLowerCase();
        const userNameB = b.username.toLowerCase();
  
        if (userNameA < userNameB) {
          return -1;
        } else if (userNameA > userNameB) {
          return 1;
        } else {
          return 0;
        }
      });
  
      return objects;
    } else {
      objects.sort((a, b) => a.numberOfPoints - b.numberOfPoints);
      return objects;
    }
}

function getSortedDesc(sortingParam) {
    const objects = userRepository.getAll();
    if (sortingParam === "name") {
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
    } else if (sortingParam === "surname") {
      objects.sort((a, b) => {
        const lastNameA = a.surname.toLowerCase();
        const lastNameB = b.surname.toLowerCase();
  
        if (lastNameA > lastNameB) {
          return -1;
        } else if (lastNameA < lastNameB) {
          return 1;
        } else {
          return 0;
        }
      });
  
      return objects;
    } else if (sortingParam === "userName"){
      objects.sort((a, b) => {
        const userNameA = a.username.toLowerCase();
        const userNameB = b.username.toLowerCase();
  
        if (userNameA > userNameB) {
          return -1;
        } else if (userNameA < userNameB) {
          return 1;
        } else {
          return 0;
        }
      });
  
      return objects;
    } else {
      objects.sort((a, b) => b.numberOfPoints - a.numberOfPoints);
      return objects;
    }
}

function getFilteredObjects(userRole, tierName) {
    const users = userRepository.getAll();
    console.log(users);
    let filteredUsers = [];
    users.forEach((obj) => {
      let hasMatchingUsers = false;
  
      if((userRole==="" || obj.userRole === userRole) && 
         (tierName==="" || obj.customerTier.tierName===tierName))
         {
          hasMatchingUsers = true;
         }
  
         if (hasMatchingUsers) {
          filteredUsers.push(obj);
        }
  
    });
  
    return filteredUsers;
}

function getUserObjectsId(userId){
    const user = getById(userId);
    let idS = [];
    user.myRentals.forEach((order) => {
      idS.push(order.id);
    })
    return idS;
}

function getCustomersByManagerId(id) {
    const userCustomers = getAllCustomers();
    console.log("usao");
    const userManager = userRepository.getById(id);
    const customersManager = [];
    userCustomers.forEach((user) => {
      user.myRentals.forEach((rental) => {
        if(rental.rentACar === userManager.myRentACars.id){
          customersManager.push(user);
        }
      });
      
    });
    console.log(customersManager.length);
    return customersManager;
}

function getAllCustomers() {
    const customers = [];
    const users = userRepository.getAll();
    users.forEach((user) => {
      if(user.userRole === "Customer")
      {
        customers.push(user);
      }
    });
    return customers;
}

function getAvailableManagers() {
    const users = userRepository.getAll();
    let availableManagers = [];
    users.forEach((user) => {
      console.log(user.userRole);
      if (user.userRole === "Manager" && user.myRentACars === null) {
        console.log("ispunilo uslov");
        availableManagers.push(user);
      }
    });
    console.log(availableManagers.length);
    return availableManagers;
}

function removeOrder(order){
    const user = getById(order.customer.id);
    console.log("user name: ", user.name);
    let index = user.myRentals.findIndex(obj => obj.id === order.id);
    user.myRentals[index].status = order.status;
    if(user.numberOfPoints - order.price/1000*133*4 >= 0){
     user.numberOfPoints -= order.price/1000*133*4;
    }
    else{
        user.numberOfPoints = 0;
    }
    user.customerTier = customerTierService.getTypeByPoints(user.numberOfPoints);
    user.numberOfCancelledRentals ++;
    userRepository.update(user.id, user);
}

function getSuspisiousCustomers(){
    const users = userRepository.getAll();
    const suspisious = [];
  
    users.forEach((user) => {
      if(user.numberOfCancelledRentals > 5 && user.userRole === "Customer"){
        suspisious.push(user);
      }
    });
    console.log(suspisious.length);
    return suspisious;
}




module.exports = { create, remove, update, getAll, getById, 
    getByUsername, addOrder, removeOrder, getAvailableManagers, 
    getUserObjectsId, getCustomersByManagerId, getFilteredObjects, getSortedAsc, 
    getSortedDesc, getSuspisiousCustomers }