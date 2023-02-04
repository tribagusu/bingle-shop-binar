"use strict"

const { UUIDV4 } = require("sequelize")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Light Americano",
          price: 10000,
          stock: 100,
          sku: "K0050",
        },
        {
          name: "Jasmine Earl Grey Tea",
          price: 15000,
          stock: 100,
          sku: "K0051",
        },
        {
          name: "Thai Tea",
          price: 9000,
          stock: 100,
          sku: "K0052",
        },
        {
          name: "Lemon Black Tea",
          price: 12000,
          stock: 100,
          sku: "K0053",
        },
        {
          name: "Light Latte",
          price: 18000,
          stock: 100,
          sku: "K0054",
        },
        {
          name: "Cappuccino",
          price: 9000,
          stock: 100,
          sku: "K0055",
        },
        {
          name: "Milo Dinosaurus",
          price: 10000,
          stock: 100,
          sku: "K0056",
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {})
  },
}
