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

module.exports = router;
