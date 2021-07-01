const Express = require('express');
const router = Express.Router();
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { DrinkModel } = require('../models/drink');

//practice route
router.get('/practice', (req, res) => {
    res.send('Test route, here!')
});



/*
============================
        Create Drink
============================
- requires login
 */












/*
============================
        Get All Drinks
============================
 */










/*
============================
    Get Drinks by User
============================
 */









/*
=================================
    Get Drinks by Drink Name
=================================
 */












/*
=================================
    Get Drinks by Main Spirit
=================================
 */