const UserModel = require ('./users');
const DrinkModel = require('./drinks');
const BarReviewModel = require('./bar-reviews');

DrinkModel.belongsTo(UserModel);
UserModel.hasMany(DrinkModel);

BarReviewModel.belongsTo(UserModel);
UserModel.hasMany(DrinkModel);


module.exports = {
    UserModel,
    DrinkModel,
    BarReviewModel
};