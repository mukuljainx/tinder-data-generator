/**
 * Profile route testing
 * @author ayusharma
 */
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const Profile = require('../../app/api/models/profile');
const app = require('../../app/api/index');
const profileData = require('./store/profile.json');

chai.use(chaiHttp);

describe('Profile', () => {
  beforeEach(done => {
    Profile.remove({}, err => {
      done();
    });
  });

  describe('/GET profiles', () => {
    it('it should GET the profiles with no content', done => {
      chai
        .request(app)
        .get('/api/profiles')
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });

    it('it should GET the profiles with content', done => {
      const profile = new Profile(profileData);
      profile.save(err => {});
      chai
        .request(app)
        .get('/api/profiles')
        .end((err, res) => {
          expect(res.body).to.have.all.keys(
            '_id',
            'about',
            'name',
            'age',
            'images',
            'bio'
          );
          expect(res.body.images.uuid).to.have.string(
            '2fd3d4c1-5b6e-4481-aa9b-ccc169608700'
          );
          done();
        });
    });

    it('it should PUT the score in profile image', done => {
      const profile = new Profile(profileData);
      profile.save(err => {});
      const id = '2fd3d4c1-5b6e-4481-aa9b-ccc169608700';
      chai
        .request(app)
        .put('/api/rate')
        .send({
          id,
          score: [1]
        })
        .end((err, res) => {
          const score = res.body.images.filter(a => a.uuid === id);
          expect(score[0].score).to.deep.equal([1]);
          done();
        });
    });
  });
});
