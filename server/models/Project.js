const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
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
  image: {
    type: DataTypes.STRING, // URL or local path
    allowNull: true
  },
  technologies: {
    type: DataTypes.JSON, // Array of tech names
    allowNull: false
  },
  githubLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  liveLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING, // e.g., 'Web', 'Mobile', 'Design'
    allowNull: false
  }
});

module.exports = Project;
