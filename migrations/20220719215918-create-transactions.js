'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_ori: {
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id'
        }
      },
      account_des: {
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      transaction_type: {
        type: Sequelize.INTEGER,
        references: {
          model: 'transaction_types',
          key: 'id'
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};