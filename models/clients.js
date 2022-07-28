'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.accounts, {
        foreignKey: 'client_id'
      })
    }
  }
  clients.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'clients',
  });
  return clients;
};