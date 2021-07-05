const { DataTypes } = require('sequelize');
const db = require('../db');

const  BarReview = db.define('barReview', {
    barName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wineListRating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cocktailRating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    foodRating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    atmosphereRating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    outdoorSeating: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = BarReview;