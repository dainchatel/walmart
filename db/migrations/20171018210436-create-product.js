'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.BIGINT
      },
      thumb: {
        type: Sequelize.TEXT
      },
      name: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      brand: {
        type: Sequelize.STRING(255)
      },
      category: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.FLOAT
      },
      msrp: {
        type: Sequelize.FLOAT
      },
      rating: {
        type: Sequelize.TEXT
      },
      reviews: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};