class CustomerTier{
    constructor(id, tierName, discount, pointsTreshold){
        this.id = id;
        this.tierName = tierName,
        this.discount = discount,
        this.pointsTreshold = pointsTreshold;
    }
};

module.exports = CustomerTier;