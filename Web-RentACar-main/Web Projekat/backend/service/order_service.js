const orderRepository = require("../repository/order_repository");
const userService = require("./user_service");
const vehicleService = require("./vehicle_service");

function getAll() {                 //dobavlja sve porudzbine
    orders = orderRepository.getAll();
    const currentDate = getTodaysDate();
    console.log(currentDate);
    orders.forEach((order) => {
      console.log(order.rentalTimeStamp);
      if(order.rentalTimeStamp === currentDate && order.status === "Approved"){
        order.status = "PickedUp";
        vehicleService.rentVehicles(order.rentedVehicles);
        update(order.id, order);
        index = orders.findIndex((o) => o.id === order.id);
        orders[index] = order;
      }
    })
    return orders;
}

function getById(orderId) {             //dobavlja porudzbinu sa odredjenim ID-em
    return orderRepository.getById(orderId);
}

function getByUser(userId){              //dobavlja sve porudzbine od nekog korisnika koje nisu otkazane
    console.log("caaaooo");
    const allOrders = orderRepository.getAll();
    let userOrders = [];
    const userOrderIds = userService.getUserObjectsId(userId);
    console.log(userOrderIds.length);
    allOrders.forEach((order) => {
        if(order.status != "Canceled"){
            userOrderIds.forEach((id) => {
                console.log("id: ", id, "object id:", order.id);
                if(id === order.id){
                    userOrders.push(order);
                }
            })
        }
    })
    return BindVehicles(userOrders);
}

function getByRentacar(rentacarId) {
    const allOrders = getAll();
    let rentacarOrders = [];
    allOrders.forEach((o) => {
      if(o.rentACar === rentacarId){
        rentacarOrders.push(o);
      }
    });
    return BindVehicles(rentacarOrders);
}

function getTodaysDate(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');
  
    const currentDate = `${year}-${month}-${day}`;
    return currentDate;
}

function create(order) {
    const newOrder = {
      uniqueOrderId: order.uniqueOrderId,
      rentACar: order.rentACar,
      rentedVehicles: order.rentedVehicles,
      rentalTimeStamp: order.rentalTimeStamp,
      leaseDuration: order.leaseDuration,
      price: order.price,
      customer: {
        id: order.customer.id,
        name: order.customer.name,
        surname: order.customer.surname,
      },
      status: order.status,
      isRated: false,
    };
    createdOrder = orderRepository.create(newOrder);
    console.log("i dalje sve ok");
    userService.addOrder(createdOrder);
    return createdOrder;
}

function remove(orderId) {
    const order = getById(orderId);
    order.status = "Canceled";
    console.log(order);
    //objectRepo.remove(id);
    update(orderId, order);
    userService.removeOrder(order);
    //vehicleService.makeVehiclesAvailable(order.rentVehicles);
}

function update(orderId, updatedOrder) {
    if(updatedOrder.status === "Returned"){
      vehicleService.makeVehiclesAvailable(updatedOrder.rentedVehicles);
    }
    orderRepository.update(orderId, updatedOrder);
}

function getAvailableVehichles(dateFrom, dateTo) {      //ova funkcija mora ovde biti jer kroz podatke o porudzbinama dobavljamo slobodna vozila
    const orders = BindVehicles(orderRepository.getAll());
    const availableVehicles = [];
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    orders.forEach((order) => {
      const beginning = new Date(order.rentalTimeStamp);
      const orderLastDay = addDaysToDate(beginning, order.leaseDuration);
      console.log("begging: ", beginning, "order last day:", orderLastDay);
      if (orderLastDay < from || beginning > to) {
        console.log("true for ", order.uniqueOrderId);          /// sta sa ovim unique id-em
        availableVehicles.push(...order.rentedVehicles);       ///??????????? sta znace ...
      }
    });
    return availableVehicles;
}

function addDaysToDate(date, days) {
    const newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() + days);
    return newDate;
}

function BindVehicles(orders) {
    let bindedVehicles = [];
    orders.forEach((order) => {
      order.rentedVehicles.forEach((vehicle) => {
        let newVehicle = vehicleService.getAll().find((v) => v.id === vehicle.id);
        bindedVehicles.push(newVehicle);
      });
      index = orders.findIndex((o) => o.id === order.id);
      orders[index].rentedVehicles = bindedVehicles;
      bindedVehicles = [];
    });
    return orders;
}

function getSortedAscending(sortingParameter, rentacarId) {
    const rentacarOrders = getByRentacar(parseInt(rentacarId));
    if (sortingParameter === "price") {
        rentacarOrders.sort((a, b) => a.price - b.price);
        return rentacarOrders;
    } else {
        rentacarOrders.sort((a, b) => {
        if (a.rentalTimeStamp < b.rentalTimeStamp) return -1;
        if (a.rentalTimeStamp > b.rentalTimeStamp) return 1;
        return 0;
        });
        return rentacarOrders;
    }
}
  
function getSortedDescending(sortingParameter, rentacarId) {
    const rentacarOrders = getByRentacar(parseInt(rentacarId));
    if (sortingParameter === "price") {
        rentacarOrders.sort((a, b) => b.price - a.price);
      return rentacarOrders;
    } else {
        rentacarOrders.sort((a, b) => {
        if (a.rentalTimeStamp > b.rentalTimeStamp) return -1;
        if (a.rentalTimeStamp < b.rentalTimeStamp) return 1;
        return 0;
      });
      return rentacarOrders;
    }
}

function getFiltered(rentacarId, priceFrom, priceTo, dateFrom, dateTo) {
    const rentacarOrders = getByRentacar(rentacarId);
    console.log(rentacarOrders);
    let ordersByDate = [];
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    console.log(from);
    console.log(to);
    rentacarOrders.forEach((order) => {
        console.log(order.rentalTimeStamp);
        const [year, month, day] = order.rentalTimeStamp.split('-');
        const beginning = new Date(`${year}-${month}-${day}`);
        console.log(beginning);
        const orderLastDay = addDaysToDate(beginning, order.leaseDuration);
        console.log(orderLastDay);
        if ((beginning >= from && orderLastDay <= to) || (beginning >=from && dateTo==="") || (dateFrom ==="" && orderLastDay<= to) || (dateFrom==="" && dateTo==="")) {
          ordersByDate.push(order);
          console.log("Usao u if");
        }
      });
    console.log(ordersByDate);
    console.log(priceFrom);
    console.log(priceTo);
    let ordersPrice = [];
    ordersByDate.forEach((order) =>{
      if(priceOrderCheck(order, priceFrom, priceTo))
      {
        ordersPrice.push(order);
      }
    });
    
    return BindVehicles(ordersPrice);
}

function priceOrderCheck(order, priceFrom, priceTo) {
    if (
      (priceFrom === "" || order.price >= parseInt(priceFrom)) &&
      (priceTo === "" || order.price <= parseInt(priceTo))
    ) {
      return true;
    }
    return false;
}

module.exports = {
    getAll,
    getById,
    getByUser,
    getByRentacar,
    create,
    remove,
    update,
    getAvailableVehichles,
    getSortedAscending,
    getSortedDescending,
    getFiltered
};
  