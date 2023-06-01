/**
 * This file defines the user model
 */

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config');


class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: true,
    },
    phonenumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        min: 0,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  },
);

module.exports = User;
