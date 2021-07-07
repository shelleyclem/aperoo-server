const { DataTypes } = require('sequelize');
const db = require('../db');

const Drink = db.define('drink', {
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
        type: DataTypes.ARRAY(DataTypes.TEXT),
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
        type: DataTypes.TEXT,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Drink;