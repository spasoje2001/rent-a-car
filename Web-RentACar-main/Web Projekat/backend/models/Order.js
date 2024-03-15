class Order{
	constructor(id, uniqueOrderId, rentedVehicles, rentACar, rentalTimeStamp, leaseDuration, price, customer, status) {
		this.id = id;
		this.uniqueOrderId = uniqueOrderId;
		this.rentedVehicles = rentedVehicles;
		this.rentACar = rentACar;
		this.rentalTimeStamp = rentalTimeStamp;
		this.leaseDuration = leaseDuration;
		this.price = price;
		this.customer = customer;
		this.status = status;
	}
}

module.exports = Order;
