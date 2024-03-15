class User{
	constructor(id, username, password, name, surname, gender, birthDate, role, myRentals, basket, managedRental, customerPoints, customerTier) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthDate = birthDate;
		this.role = role;
		this.myRentals = myRentals;
		this.basket = basket;
		this.managedRental = managedRental;
		this.customerPoints = customerPoints;
	    this.customerTier = customerTier;
	}
}

module.exports = User;