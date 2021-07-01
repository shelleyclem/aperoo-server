const Express = require('express');
const router = Express.Router();
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { DrinkModel } = require('../models');

//practice route
router.get('/practice', (req, res) => {
    res.send('Test route, here!')
});



/*
============================
        Create Drink
============================
- Create
- Requires login
*/

router.post('/mixNewDrink', validateSession, async (req, res) => {
    const { drinkName, containsAlcohol, mainSpirit, ingredients, servingGlassType, garnish, notes, username, date} = req.body;
    const { id } = req.user;
    const drinkEntry = {
        drinkName,
        containsAlcohol,
        mainSpirit,
        ingredients,
        servingGlassType,
        garnish,
        notes,
        username,
        date,
        owner: id
    }
    try {
        const newDrink = await DrinkModel.create(drinkEntry);
        res.status(200).json(newDrink);
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                msg: 'A drink by this name already exists.'
            });
        } else {
            res.status(500).json({
                msg: `Server error: ${err}`
            })
        }
    }
});



/*
============================
        Get All Drinks
============================
- Read
*/

router.get('/all', async (req, res) => {
    try {
        const allDrinks = await DrinkModel.findAll();
        res.status(200).json(allDrinks);
    } catch (err) {
        res.status(500).json({
            msg: `Finding drinks failed: ${err}`
        })
    }
});



/*
===============================
    Get Drinks by Drink Name
===============================
- Read
*/

router.get('/:drinkName', async (req, res) => {
    const { drinkName } = req.params;
    try {
        let thisDrink = await DrinkModel.findOne({
            where: { drinkName: drinkName }
        })
        res.status(200).json(thisDrink)
    } catch (err) {
        res.status(500).json({
            msg: `Sorry, there was an error. ${err}`
        })
    }
});



/*
=================================
    Get Drinks by Main Spirit
=================================
- Read
*/

router.get('/:mainSpirit', async (req, res) => {
    const { mainSpirit } = req.params;
    try { 
        let thisDrink = await DrinkModel.findOne({
            where: { mainSpirit: mainSpirit }
        });
        res.status(200).json(thisDrink)
    } catch (err) {
        res.status(500).json({
            msg: `Sorry, there was an error. ${err}`
        })
    }
});



/*
=================================
            Edit Drink
=================================
- Update
- Requires login
*/

router.put('/:id', validateSession, async (req, res) => {
    const { drinkName, containsAlcohol, mainSpirit, ingredients, servingGlassType, garnish, notes, username, date } = req.body;
    try {
        const modifyDrink = await DrinkModel.update (
            { drinkName, containsAlcohol, mainSpirit, ingredients, servingGlassType, garnish, notes, username, date }, 
            where: {id: req.params.id} 
        )
        res.status(200).json({
            msg: 'Drink successfully updated.'
        })
    } catch (err) {
        res.status(500).json({
            msg: `Update(s) to drink failed: ${err}`
        })
    }
});



/*
=================================
            Delete Drink
=================================
- Delete
- Requires Login
*/

router.delete('/:id', async (req, res) => {
    try {
        const locatedDrink = await DrinkModel.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            msg: "Drink successfully deleted",
            deletedDrink: locatedDrink
        })
    } catch (err) {
        res.status(500).json({
            msg: `Failed to delete drink: ${err}`
        })
    }
})

module.exports = router;