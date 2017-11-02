const mongoose = require('mongoose');
const User = require('../models/user');

function getErrorMessage(err) {
  if (err.errors) {
    return err;
  }
  return "Unknown Server Error";
}

/**
 * Returns a random number between min and max
 */
function getRandomArbitary (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

exports.create = (body) => {
    const user = new User(body);

    user.save((err) => {
        if (err) {
            console.log(err);
        }
        return true;
    })
}

exports.find = (req, res) => {
    User.find({'score': {$lt: 5}})
    .exec((err, users) => {
        if (err) {
            return res.status(400)
            .send({message: getErrorMessage(err)});
        }
        const random = getRandomArbitary(0, users.length);
        console.log(random);
        return res.status(200).json(users[random]);
    });
};

exports.score = (req, res) => {
  User.findOneAndUpdate({_id: req.body.id},
        { score: req.bo.score },(err, user) => {
        if(err){
            return res.send(err);
        }
        return res.status(200).json({message: 'Sucssfully updated'});
    });
};


