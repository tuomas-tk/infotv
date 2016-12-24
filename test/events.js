let chai = require('chai');
let chaiHttp = require('chai-http');

var pg = require('pg');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);



describe('Events', () => {

  beforeEach((done) => { // Create some data to the database

    pg.connect(process.env.DATABASE_URL, function(err, client, doneConnect) {

      if (err) {
        done(err);
        doneConnect();

      } else {
        client.query('DELETE FROM events', function(err, result) {

          if (err) {
            done(err);
            doneConnect();

          } else {
            client.query(' \
            INSERT INTO events (title) VALUES \
            (\'Fantastic title!\'), \
            (\'Another fantastic title!\')', function(err, result) {

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

  it('should GET all the events', (done) => {
    chai.request(server)
    .get('/api/events/list')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.success.should.equal(true);
      res.body.data.should.be.a('array');
      res.body.data.length.should.be.eql(2);

      res.body.data[0].should.be.an('object');
      res.body.data[0].title.should.equal('Fantastic title!');
      res.body.data[1].should.be.an('object');
      res.body.data[1].title.should.equal('Another fantastic title!');
      done();
    });
  });


  it('should PUT a new event', (done) => {
    chai.request(server)
    .put('/api/events/create')
    .send({title: 'Created event'})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.success.should.equal(true);

      chai.request(server)
      .get('/api/events/list')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.success.should.equal(true);
        res.body.data.should.be.a('array');
        res.body.data.length.should.be.eql(3);

        res.body.data[0].should.be.an('object');
        res.body.data[0].title.should.equal('Fantastic title!');
        res.body.data[1].should.be.an('object');
        res.body.data[1].title.should.equal('Another fantastic title!');
        res.body.data[2].should.be.an('object');
        res.body.data[2].title.should.equal('Created event');

        done();
      });

    });
  });


  it('should POST an edit to existing event', (done) => {
    var event_id;

    chai.request(server) // Get the id of the second event
    .get('/api/events/list')
    .end((err, res) => {
      event_id = res.body.data[1].id;


      chai.request(server) // Edit the event to "Edited event"
      .post('/api/events/edit')
      .send({id: event_id, title: 'Edited event'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.success.should.equal(true);

        chai.request(server)
        .get('/api/events/list')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.success.should.equal(true);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(2);

          res.body.data[0].should.be.an('object');
          res.body.data[0].title.should.equal('Fantastic title!');
          res.body.data[1].should.be.an('object');
          res.body.data[1].title.should.equal('Edited event');
          done();

        });
      });
    });
  });


  it('should NOT POST an edit to inexisting event', (done) => {
    var event_id;

    try {

      chai.request(server) // Get the id of the inexisting event
      .get('/api/events/list')
      .end((err, res) => {
        event_id = res.body.data[1].id + 1;

        chai.request(server) // Edit the inexisting event to "Edited event"
        .post('/api/events/edit')
        .send({id: event_id, title: 'Edited event'})
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.success.should.equal(false);
          res.body.data.should.equal('Event not found');

          chai.request(server)
          .get('/api/events/list')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.success.should.equal(true);
            res.body.data.should.be.a('array');
            res.body.data.length.should.be.eql(2);

            res.body.data[0].should.be.an('object');
            res.body.data[0].title.should.equal('Fantastic title!');
            res.body.data[1].should.be.an('object');
            res.body.data[1].title.should.equal('Another fantastic title!');
            done();

          });
        })
      })

    } catch (err) {
      console.log(err);
      done(err);
    }

  });


  it('should DELETE existing event', (done) => {
    var event_id;

    chai.request(server) // Get the id of the second event
    .get('/api/events/list')
    .end((err, res) => {
      event_id = res.body.data[1].id;


      chai.request(server) // Edit the event to "Edited event"
      .delete('/api/events/delete')
      .send({id: event_id})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.success.should.equal(true);

        chai.request(server)
        .get('/api/events/list')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.success.should.equal(true);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(1);

          res.body.data[0].should.be.an('object');
          res.body.data[0].title.should.equal('Fantastic title!');
          done();

        });
      });
    });
  });


  it('should NOT DELETE inexisting event', (done) => {
    var event_id;

    chai.request(server) // Get the id of the inexisting event
    .get('/api/events/list')
    .end((err, res) => {
      event_id = res.body.data[1].id + 1;


      chai.request(server) // Edit the inexisting event to "Edited event"
      .delete('/api/events/delete')
      .send({id: event_id})
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.success.should.equal(false);
        res.body.data.should.equal('Event not found');

        chai.request(server)
        .get('/api/events/list')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.success.should.equal(true);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(2);

          res.body.data[0].should.be.an('object');
          res.body.data[0].title.should.equal('Fantastic title!');
          res.body.data[1].should.be.an('object');
          res.body.data[1].title.should.equal('Another fantastic title!');
          done();

        });
      });
    });

  });

});
