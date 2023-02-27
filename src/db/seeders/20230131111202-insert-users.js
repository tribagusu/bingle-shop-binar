"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          address: "Jakarta",
          email: "satu@gmail.com",
          password:
            "$2y$10$GCjY/7K/SV4sE8p7W6VdXu7nSTsoa7hHme/tz0SHoXj/ylW7gcq6e",
          role: "admin",
        },
        {
          name: "Sinatra",
          address: "Jakarta",
          email: "dua@gmail.com",
          password:
            "$2y$10$jtYbmjE4VmFW/ncjO9d/h.HLYsjP0eQLHv9mYNWEWDHCrZLmSZUXO",
          role: "user",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
