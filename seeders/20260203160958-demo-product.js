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
    await queryInterface.bulkInsert("Products", [
      {
        name: "KATANA 17 B12V",
        description: "MSI is cheap and modern",
        color: "Black",
        price: 929,
        qty: 30,
        category_id: 4,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Logitech",
        description: "mouse with modern style",
        color: "Black",
        price: 39,
        qty: 50,
        category_id: 3,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
