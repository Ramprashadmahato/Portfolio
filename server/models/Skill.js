const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER, // 1 to 100
    allowNull: false
  },
  category: {
    type: DataTypes.STRING, // e.g., 'Frontend', 'Backend', 'Tools'
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Skill;
