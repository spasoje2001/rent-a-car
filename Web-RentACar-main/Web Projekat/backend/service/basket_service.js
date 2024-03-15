const basetRepository = require("../repository/basket_repository");

function getAll() {
    return basetRepository.getAll();
}
  
function getById(basketId) {
    return basetRepository.getById(basketId);
}

function getByUser(userId) {
    return basetRepository.getAll().find((basket) => basket.user.id === userId);
}

function create(basket) {
  return basetRepository.create(basket);
}

function remove(basket) {
    basetRepository.remove(basket);
}

function update(id, updatedObject) {
    basetRepository.update(id, updatedObject);
}

module.exports = {
    getAll,
    getById,
    getByUser,
    create,
    remove,
    update
};