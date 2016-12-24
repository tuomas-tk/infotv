let chai = require('chai');
let chaiHttp = require('chai-http');

var pg = require('pg');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);




describe('Announcements', () => {

    beforeEach((done) => { // Create some data to the database

      pg.connect(process.env.DATABASE_URL, function(err, client, doneConnect) {
        if (err) {
          done(err);
          doneConnect();
        } else {
          client.query('DELETE FROM announcements', function(err, result) {
            if (err) {
              done(err);
              doneConnect();

            } else {
              client.query(' \
              INSERT INTO announcements (title, content) VALUES \
              (\'Fantastic title\', \'Fantastic content\'), \
              (\'Another fantastic title\', \'Another fantastic content\')', function(err, result) {

                if (err) {
                  done(err);

                } else {
                  done();
                }
                doneConnect();
              });
            }
          });
        }
      });

    });

    it('should GET all the announcements', (done) => {
      chai.request(server)
      .get('/api/announcements/list')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.success.should.equal(true);
        res.body.data.should.be.a('array');
        res.body.data.length.should.be.eql(2);

        res.body.data[0].should.be.an('object');
        res.body.data[0].title.should.equal('Fantastic title');
        res.body.data[0].content.should.equal('Fantastic content');
        res.body.data[1].should.be.an('object');
        res.body.data[1].title.should.equal('Another fantastic title');
        res.body.data[1].content.should.equal('Another fantastic content');
        done();
      });
    });


    it('should PUT a new announcement', (done) => {
      chai.request(server)
      .put('/api/announcements/create')
      .send({title: 'Created title', content: 'Created content'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.success.should.equal(true);

        chai.request(server)
        .get('/api/announcements/list')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.success.should.equal(true);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(3);

          res.body.data[0].should.be.an('object');
          res.body.data[0].title.should.equal('Fantastic title');
          res.body.data[0].content.should.equal('Fantastic content');
          res.body.data[1].should.be.an('object');
          res.body.data[1].title.should.equal('Another fantastic title');
          res.body.data[1].content.should.equal('Another fantastic content');
          res.body.data[2].should.be.an('object');
          res.body.data[2].title.should.equal('Created title');
          res.body.data[2].content.should.equal('Created content');

          done();
        });

      });
    });


    it('should POST an edit to existing announcement', (done) => {
      var announcement_id;

      chai.request(server) // Get the id of the second announcement
      .get('/api/announcements/list')
      .end((err, res) => {
        announcement_id = res.body.data[1].id;


        chai.request(server) // Edit the announcement to "Edited"
        .post('/api/announcements/edit')
        .send({id: announcement_id, title: 'Edited title', content: 'Edited content'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.success.should.equal(true);

          chai.request(server)
          .get('/api/announcements/list')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.success.should.equal(true);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eql(2);

            res.body.data[0].should.be.an('object');
            res.body.data[0].title.should.equal('Fantastic title');
            res.body.data[0].content.should.equal('Fantastic content');
            res.body.data[1].should.be.an('object');
            res.body.data[1].title.should.equal('Edited title');
            res.body.data[1].content.should.equal('Edited content');
            done();

          });
        });
      });
    });


    it('should NOT POST an edit to inexisting announcement', (done) => {
      var announcement_id;

      chai.request(server) // Get the id of the inexisting announcement
      .get('/api/announcements/list')
      .end((err, res) => {
        announcement_id = res.body.data[1].id + 1;


        chai.request(server) // Try to edit the inexisting announcement
        .post('/api/announcements/edit')
        .send({id: announcement_id, title: 'Edited title', content: 'Edited content'})
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.success.should.equal(false);
          res.body.data.should.equal('Announcement not found');

          chai.request(server)
          .get('/api/announcements/list')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.success.should.equal(true);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eql(2);

            res.body.data[0].should.be.an('object');
            res.body.data[0].title.should.equal('Fantastic title');
            res.body.data[0].content.should.equal('Fantastic content');
            res.body.data[1].should.be.an('object');
            res.body.data[1].title.should.equal('Another fantastic title');
            res.body.data[1].content.should.equal('Another fantastic content');
            done();

          });
        })
      })

    });


    it('should DELETE existing announcement', (done) => {
      var announcement_id;

      chai.request(server) // Get the id of the second announcement
      .get('/api/announcements/list')
      .end((err, res) => {
        announcement_id = res.body.data[1].id;


        chai.request(server) // Delete the announcement
        .delete('/api/announcements/delete')
        .send({id: announcement_id})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.success.should.equal(true);

          chai.request(server)
          .get('/api/announcements/list')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.success.should.equal(true);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eql(1);

            res.body.data[0].should.be.an('object');
            res.body.data[0].title.should.equal('Fantastic title');
            res.body.data[0].content.should.equal('Fantastic content');
            done();

          });
        });
      });
    });


    it('should NOT DELETE inexisting announcement', (done) => {
      var announcement_id;

      chai.request(server) // Get the id of the inexisting announcement
      .get('/api/announcements/list')
      .end((err, res) => {
        announcement_id = res.body.data[1].id + 1;


        chai.request(server) // Delete the inexisting announcement
        .delete('/api/announcements/delete')
        .send({id: announcement_id})
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.success.should.equal(false);
          res.body.data.should.equal('Announcement not found');

          chai.request(server)
          .get('/api/announcements/list')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.success.should.equal(true);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eql(2);

            res.body.data[0].should.be.an('object');
            res.body.data[0].title.should.equal('Fantastic title');
            res.body.data[0].content.should.equal('Fantastic content');
            res.body.data[1].should.be.an('object');
            res.body.data[1].title.should.equal('Another fantastic title');
            res.body.data[1].content.should.equal('Another fantastic content');
            done();

          });
        });
      });

    });

});
