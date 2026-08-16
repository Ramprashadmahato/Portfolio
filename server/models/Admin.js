// models/Admin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('Admin', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'normal'), defaultValue: 'normal' }
});

module.exports = Admin;
