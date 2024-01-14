"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Project_User", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      projectID: {
        type: Sequelize.INTEGER,
      },
      userID: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "User",
        //   key: "id",
        // },
        // onUpdate: "CASCADE",
        // onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Project_User");
  },
};

// run code to DB: npx sequelize-cli db:migrate
// run code to undo DB: npx sequelize-cli db:migrate:undo
