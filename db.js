const Sequelize = require('sequelize');
// const Drink = require('./models/drinks');
// const User = require('./models/users');
// const BarReview = require('./models/bar-reviews');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
})

// sequelize.authenticate().then(
//     function () {
//         console.log('connected to aperoo server');
//     },
//     function (err) {
//         console.log(err);
//     }
// )




module.exports = sequelize;