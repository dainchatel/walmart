'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    itemId: DataTypes.BIGINT,
    thumb: DataTypes.TEXT,
    name: DataTypes.TEXT,
    url: DataTypes.TEXT,
    brand: DataTypes.STRING(255),
    category: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    msrp: DataTypes.FLOAT,
    rating: DataTypes.TEXT,
    reviews: DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};