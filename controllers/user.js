const mongoose = require('mongoose');
const User = require('../models/user');

console.log('c1');

exports.create = (req) => {
    const user = new User(req.body);

    user.save((err) => {
        if (err) {
            console.log('errropr is here');
        }
        return true;
    })
}