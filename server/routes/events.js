var express = require('express');
var pg = require('pg');
var router = express.Router();

/* GET all events. */
router.get('/list', function(req, res) {

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      console.error(err);
      res.send("Error " + err);
    } else {
      client.query('SELECT * FROM events', function(err, result) {
        done();
        if (err) {
          console.error(err);
          res.send("Error " + err);
        } else {
          res.json({results: result.rows});
        }
      });
    }

  });

});


router.post('/create', (req, res) => {

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});

    } else {
      client.query('INSERT INTO events(title) values($1)', [req.body.title], function(err, result) {
        done();
        if (err) {
          console.error(err);
          return res.send("Error " + err);
        } else {
          return res.json({
            success: true
          });
        }
      });
    }

  });

});

module.exports = router;
