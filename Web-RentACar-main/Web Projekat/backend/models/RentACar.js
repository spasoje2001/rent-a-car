class RentACar{
	constructor(id, name, vehicles, businessHours, workingStatus,
			location, logo, rating) {
		this.id = id;
		this.name = name;
		this.vehicles = vehicles;
		this.businessHours = businessHours;
		this.workingStatus = workingStatus;
		this.location = location;
		this.logo = logo;
		this.rating = rating;
	}
}

module.exports = RentACar;