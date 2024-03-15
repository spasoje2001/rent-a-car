const commentRepository = require("../repository/comment_repository");
const orderService = require("./order_service");

function create(object) {
    return commentRepository.create(object);
}

function remove(object) {
    commentRepository.remove(object);
}

function getByRentalId(id) {
    const comments = commentRepository.getAll();
    const rentalComments = [];

    comments.forEach((com) => {
        if(com.rentacarId === id){
            rentalComments.push(com);
        }
    });

    return rentalComments;
}

function getAcceptedByRentalId(id){
  const comments = commentRepository.getAll();
  const rentalComments = [];
  comments.forEach((com) => {
        if(com.rentacarId ===id && com.managerApproved===true){
          rentalComments.push(com);
        }
      }
  );

  return rentalComments;
}

function getUnapprovedByObjectId(id){
  console.log("svi: ", commentRepository.getAll().length);

  console.log("broj unapproved: ", commentRepository.getAll().filter((object) => object.rentacarId === id && !object.managerApproved).length)
  return commentRepository.getAll().filter((object) => object.rentacarId === id && !object.managerApproved);
}


function getAll() {
  return commentRepository.getAll();
}

function getById(id) {
  return commentRepository.getById(id);
}

function update(id, updatedObject) {
    commentRepository.update(id, updatedObject);
}

module.exports = {
  create,
  remove,
  getAll,
  getById,
  getByRentalId,
  update,
  getAcceptedByRentalId,
  getUnapprovedByObjectId,
};