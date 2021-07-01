const { DataTypes } = require('sequelize');
const db = require('../db');

const Drinks = db.define('drink', {
    drinkName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    containsAlcohol: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    mainSpirit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ingredients: {
        type: DataTypes.ARRAY,
        allowNull: false
    },
    servingGlassType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    garnish: {
        type: DataTypes.STRING,
        allowNull: true
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Drinks;