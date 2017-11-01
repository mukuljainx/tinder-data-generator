const mongoose = require('mongoose');
const User = require('../models/user');

console.log('c1');

exports.create = (body) => {
    const user = new User(body);

    user.save((err) => {
        if (err) {
            console.log(err);
        }
        return true;
    })
}