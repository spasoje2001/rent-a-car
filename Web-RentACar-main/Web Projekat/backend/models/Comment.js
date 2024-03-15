class Comment{
	constructor(id, customer, rentACarId, text, rating, isManagerApproved) {
		super();
		this.id = id;
		this.customer = customer;
		this.rentACarId = rentACarId;
		this.text = text;
		this.rating = rating;
		this.isManagerApproved = isManagerApproved;
	}
}
 
module.exports = Comment;