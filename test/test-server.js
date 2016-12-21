const chai = require('chai')
const chaiHttp = require('chai-http');
const should = chai.should();

const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

describe('Blog Posts', function() {
  // we need to start server before each test cause
  before(function() {
    return runServer();
  });

  // we need to shut down server after each test case runs
  after(function() {
    return closeServer();
  });

  // test strategy
  // 1 - make GET request to /blog-posts
  // 2 - inspect response body for existence of array of objects
  // 3 - inspect response for object structure (verify certain keys exist)
  it('should list blog posts on GET', function() {
    return chai.request(app)
    .get('/posts')
    .then(function(res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
      res.body.forEach(function(item) {
        item.should.be.a('object');

      })
    });
  });

});
