const tierRepository = require("../repository/customerTier_repository");

function create(object) {
  return tierRepository.create(object);
}

function remove(object) {
    tierRepository.remove(object);
}

function getAll() {
  const objects = tierRepository.getAll();
  console.log("pre sort", objects.length);
  objects.sort((a, b) => b.requiredPointNumber - a.requiredPointNumber);
  console.log("posle sort", objects.length);
  return objects;
}

function getBronze() {
  return getAll().find((obj) => obj.nameType === "Bronze");
}

function getSilver(){
    return getAll().find((obj) => obj.nameType === "Silver");
}

function getGold(){
    return getAll().find((obj) => obj.nameType === "Gold");
}

function getTypeByPoints(points){
  console.log("points entered");
  const types = getAll();
  console.log(types);
  for (const type of types) {
    if (points >= type.pointCap) {
      return type;
    }
  }
  return {};
}

function update(id, updatedObject) {
  tierRepository.update(id, updatedObject);
}

module.exports = {
  create,
  remove,
  getAll,
  update,
  getBronze,
  getGold,
  getSilver,
  getTypeByPoints,
};