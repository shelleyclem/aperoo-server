const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

const validateRole = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    } else if (req.headers.authorization) {

        const { authorization } = req.headers;
        const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined

        if (payload) {
            let foundUser = await UserModel.findOne({
                where: { id: payload.id, 
                role: 'admin'}
            });

            if (foundUser) {
                req.user= foundUser;
                next()
            } else {
                res.status(400).send({
                    msg: 'Not authorized'
                });
            }
        } else {
            res.status(401).send({
                msg: 'Invalid token'
            });
        }
    } else {
        res.status(403).send({
            msg: 'Forbidden'
        });
    }
}

module.exports = validateRole;