'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.clients, {
        foreignKey: 'client_id'
      })
      this.belongsTo(models.AccountTypes, {
        foreignKey: 'type'
      })
      this.hasMany(models.transactions, {
        foreignKey: 'account_ori'
      })
    }
  }
  accounts.init({
    account_no: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL,
    type: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    modelName: 'accounts',
  });
  return accounts;
};