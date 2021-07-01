const Sequelize = require('sequelize');
const Drink = require('./models/drinks');
const User = require('./models/users');
const BarReview = require('./models/bar-reviews');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

sequelize.authenticate().then(
    function () {
        console.log('connected to aperoo server');
    },
    function (err) {
        console.log(err);
    }
)

User = sequelize.import('./models/users');
Drink = sequelize.import('./models/drinks');
BarReview = sequelize.import('./models/bar-reviews');

Drink.belongsTo(User);
User.hasMany(Drink);

BarReview.belongsTo(User);
User.hasMany(Drink);


module.exports = sequelize;