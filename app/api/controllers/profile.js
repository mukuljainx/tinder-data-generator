/**
 * Tinder profile controller
 * @author ayusharma
 */
const mongoose = require('mongoose');
const Profile = require('../models/profile');

/**
 * Error middleware
 * @param {object} err
 * @returns {string}
 */
function getErrorMessage(err) {
  if (err.errors) {
    return err;
  }
  return 'Unknown Server Error';
}

/**
 * Returns a random number between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomArbitary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Create and save a tinder profile
 * @param {object} body
 */
exports.create = body => {
  const profile = new Profile(body);

  profile.save(err => {
    if (err) {
      console.log(err);
    }
    return true;
  });
};

/**
 * Find profiles to rate
 * @param {object} req
 * @param {object} res
 */
exports.find = (req, res) => {
  console.log('response');
  // profile.find({'score': {$lt: 5}})
  Profile.find({
    images: { $elemMatch: { 'score.4': { $exists: false } } }
  }).exec((err, profile) => {
    if (err) {
      return res.status(500).send({ message: getErrorMessage(err) });
    }
    const random = getRandomArbitary(0, profile.length);
    const selectedProfile = profile[random];

    const selectedImage = selectedProfile
      ? selectedProfile.images.filter(img => img.score.length < 5)
      : [];

    const responseProfile = selectedProfile
      ? {
          _id: selectedProfile._id,
          name: selectedProfile.name,
          age: selectedProfile.age,
          bio: selectedProfile.bio,
          about: selectedProfile.about,
          images: selectedImage.length
            ? selectedImage[getRandomArbitary(0, selectedImage.length)]
            : {}
        }
      : {};
    if (Object.keys(responseProfile).length) {
      return res.status(200).json(responseProfile);
    }
    return res.status(204).send('No data');
  });
};

/**
 * Rate an image of a single profile
 * @param {object} req
 * @param {object} res
 */
exports.score = (req, res) => {
  const { id, score } = req.body;
  Profile.findOneAndUpdate(
    { 'images.uuid': id },
    {
      $set: {
        'images.$.score': score
      }
    },
    (err, profile) => {
      if (err) {
        return res.send(err);
      }
      Profile.findOne({ 'images.uuid': id }).exec((err, pf) => {
        return res.status(200).json(pf);
      });
    }
  );
};
