"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_items", {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "orders",
          key: "id",
          as: "order_id",
        },
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "products",
          key: "id",
          as: "product_id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order_items");
  },
};
