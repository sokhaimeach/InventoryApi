'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("Customers", [
      {
        first_name: "Meach",
        last_name: "Sokhai",
        phone: "0123456789",
        password: "1234",
        username: "sokhai",
        email: "sokhai@gmail.com",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: "Hongly",
        last_name: "Long",
        phone: "0123456788",
        password: "1234",
        username: "long",
        email: "long@gmail.com",
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await  queryInterface.bulkDelete("Customers", null, {});
  }
};
