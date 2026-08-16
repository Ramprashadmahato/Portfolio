const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Hero = sequelize.define('Hero', {
  name: { type: DataTypes.STRING, defaultValue: 'Ram Prashad Mahato' },
  titles: { type: DataTypes.TEXT, defaultValue: 'Web Developer, Software Developer, Freelancer' }, // Comma separated
  description: { type: DataTypes.TEXT, defaultValue: "I'm an aspiring Web & Software Developer with a strong foundation in modern technologies." },
  cvUrl: { type: DataTypes.STRING, allowNull: true },
  profileImage: { type: DataTypes.STRING, allowNull: true },
  linkedin: { type: DataTypes.STRING, allowNull: true },
  github: { type: DataTypes.STRING, allowNull: true },
  facebook: { type: DataTypes.STRING, allowNull: true },
  instagram: { type: DataTypes.STRING, allowNull: true }
});

module.exports = Hero;
