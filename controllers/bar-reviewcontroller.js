const Express = require('express');
const sequelize = require('../db');
const router = Express.Router();
const validateSession = require('../middleware/validate-session');
const validateRole = require('../middleware/validate-role');

const { BarReviewModel, DrinkModel } = require('../models');

/*
=================================
        Create Bar Review
=================================
- Create
- Requires Login
*/

router.post('/addBar', validateSession, async (req, res) => {
    const { barName, wineListRating, cocktailRating, foodRating, atmostphereRating, outdoorSeating, zipcode, notes, username, date } = req.body;
    const { id } = req.user;
    const barEntry = {
        barName,
        wineListRating,
        cocktailRating,
        foodRating,
        atmostphereRating,
        outdoorSeating,
        zipcode,
        notes,
        username,
        date,
        owner: id
    }
    try {
        const newBarReview = await BarReviewModel.create(barEntry);
        res.status(200).json(newBarReview);
    } catch (err) {
        res.status(500).json({
            msg: `Server error: ${err}`
        })
    }
});



/*
=================================
        Get All Bar Reviews
=================================
- Read
*/

router.get('/all', async (req, res) => {
    try {
        const allBarReviews = await BarReviewModel.findAll();
        res.status(200).json(allBarReviews);
    } catch (err) {
        res.status(500).json({
            msg: `Finding bar reviews failed: ${err}`
        })
    }
});

/*
=================================
    Get Bar Reviews by Name
=================================
- Read
*/

router.get('/:barName', async (req, res) => {
    const { barName } = req.params;
    try {
        let thisBar = await BarReviewModel.findOne({
            where: { drinkName: drinkName }
        })
        res.status(200).json(thisBar)
    } catch (err) {
        res.status(500).json({
            msg: `Sorry, there was an error. ${err}`
        })
    }
});



/*
=================================
    Get Bar Review by Zip
=================================
- Read
*/

router.get('/:zipcode', async (req, res) => {
    const { zipcode } = req.params;
    try {
        let thisBar = await DrinkModel.findOne({
            where: { zipcode: zipcode }
        })
    } catch (err) {
        res.status(500).json({
            msg: `Sorry, there was an error ${err}`
        })
    }
});



/*
=================================
        Edit Bar Review
=================================
- Update
- Requires Login
*/

router.put('/:id', validateSession, async (req, res) => {
    const { barName, wineListRating, cocktailRating, foodRating, atmostphereRating, outdoorSeating, zipcode, notes, username, date } = req.body;
    try {
        const modifyBarReview = await BarReviewModel.update (
            { barName, wineListRating, cocktailRating, foodRating, atmostphereRating, outdoorSeating, zipcode, notes, username, date },
            { where: {id: req.params.id} }
        )
        res.status(200).json({
            msg: 'Review successfully updated.'
        })
    } catch (err) {
        res.status(500).json({
            msg: `Update(s) to review failed: ${err}`
        })
    }
});



/*
=================================
        Delete Bar Review
=================================
- Delete
- Requires Login
*/

router.delete('/:id', validateRole, async (req, res) => {
    try {
        const locatedBarReview = await BarReviewModel.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            msg: 'Review successfully deleted',
        })
    } catch (err) {
        
        res.status(500).json({
            msg: `Failed to delete review: ${err}`
        })
    }
});

module.exports = router;