const router = require('express').Router();
const { UserModel } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*
============================
    Register User
============================
*/

router.post('/register', async (req, res) => {
    let { firstName, lastName, username, password, admin} = req.body.user;
    try {
        const User = await UserModel.create({
            firstName,
            lastName,
            username,
            password: bcrypt.hashSync(password, 13),
            admin
        });

        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET,, { expiresIn: 60 * 60 * 24 })

        res.status(201).json({
            msg: 'User successfully registered',
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError){
            res.status(409).json({
                msg: 'That username is already in use.'
            })
        } else {
            res.status(500).json({
                msg: 'Registration failed :( '
            });
        }
    }
});

/*
============================
        Login User
============================
*/

router.post('./login', async (req, res) => {
    let {username, password} = req.body.user;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                username: username,
            },
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) {
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 20,});
                res.status(200).json({
                    user: loginUser,
                    message: 'Logged in user successfully.',
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: 'Incorrect username or password.'
                });
            }
        } else {
            res.status(401).json({
                msg: 'Incorrect username or password.'
            });
        }
    } catch (err) {
        res.status(500).json({
            msg: 'User login failed.'
        });
    }
});

module.exports = router;