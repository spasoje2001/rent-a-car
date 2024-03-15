class Vehicle{
	constructor(id, brand, model, price, type, rentACar, transmissionType, fuelType, consumption, doors, maxPersons, description, image, status) {
		this.id = id;
		this.brand = brand;
		this.model = model;
		this.price = price;
		this.type = type;
		this.rentACarId = rentACarId;
		this.transmissionType = transmissionType;
		this.fuelType = fuelType;
		this.consumption = consumption;
		this.doors = doors;
		this.maxPersons = maxPersons;
		this.description = description;
		this.image = image;
		this.status = status;
	}
}

module.exports = Vehicle;