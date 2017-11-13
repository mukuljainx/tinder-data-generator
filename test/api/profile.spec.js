/**
 * Profile route testing
 * @author ayusharma
 */
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const Profile = require('../../app/api/models/profile');
const app = require('../../app/api/index');

chai.use(chaiHttp);

describe('Profile', () => {
  beforeEach(done => {
    Profile.remove({}, err => {
      done();
    });
  });

  describe('/GET profiles', () => {
    it('it should GET the profiles', done => {
      chai
        .request(app)
        .get('/api/profiles')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
