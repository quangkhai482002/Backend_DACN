"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "candidate@gmail.com",
          password: "123456",
          username: "John Doe",
        },
        {
          email: "candidate1@gmail.com",
          password: "123456",
          username: "John Doe1",
        },
        {
          email: "candidate2@gmail.com",
          password: "123456",
          username: "John Doe2",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

// runcode to create this file: npx sequelize-cli seed:generate --name demo-user
// runcode to seed data: npx sequelize-cli db:seed:all
// runcode to undo seed data: npx sequelize-cli db:seed:undo:all
