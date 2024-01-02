const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Note API', () => {
  it('should create a new note', (done) => {
    chai.request(app)
      .post('/api/notes')
      .send({ title: 'Test Note', content: 'This is a test note' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('title').to.equal('Test Note');
        expect(res.body).to.have.property('content').to.equal('This is a test note');
        done();
      });
  });

  // Add more test cases for other endpoints
});
