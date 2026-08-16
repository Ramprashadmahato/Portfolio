const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  icon: {
    type: DataTypes.STRING, // Store icon name or SVG path
    allowNull: false
  },
  color: {
    type: DataTypes.STRING, // e.g., 'from-blue-500 to-cyan-500'
    allowNull: false
  }
});

module.exports = Service;
