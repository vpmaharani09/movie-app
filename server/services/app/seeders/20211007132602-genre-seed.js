"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
      "Genres",
      [
        {
          name: "Romance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Thriller",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Action",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fantasy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Horror",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Comedy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Melodrama",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Genres", null, {});
  },
};
