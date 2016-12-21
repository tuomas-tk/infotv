var express = require('express');
var pg = require('pg');
var router = express.Router();

/* GET all events. */
router.get('/list', function(req, res) {

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    } else {
      client.query('SELECT * FROM events', function(err, result) {
        done();
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            data: err
          });
        } else {
          res.json({
            success: true,
            data: result.rows
          });
        }
      });
    }

  });

});


router.put('/create', (req, res) => {

  const data = {
    'title': req.body.title
  };

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      console.error(err);
      return res.status(500).json({
        success: false, data: err
      });

    } else {
      client.query('INSERT INTO events(title) values($1)', [data.title], function(err, result) {
        done();
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false, data: err
          });
        } else {
          return res.json({
            success: true
          });
        }
      });
    }

  });

});

router.post('/edit', (req, res) => {

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});

    } else {
      client.query('UPDATE events SET title = $1 WHERE id = $2', [req.body.title, req.body.id], function(err, result) {
        done();
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            data: err
          });
        } else if (result.rowCount != 1) {
          return res.status(404).json({
            success: false,
            data: 'Event not found'
          });
        } else {
          return res.json({
            success: true
          });
        }
      });
    }

  });

});

router.delete('/delete', (req, res) => {

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      console.error(err);
      return res.status(500).json({success: false, data: err});

    } else {
      client.query('DELETE FROM events WHERE id=$1', [req.body.id], function(err, result) {
        done();
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            data: err
          });
        } else if (result.rowCount != 1) {
          return res.status(404).json({
            success: false,
            data: 'Event not found'
          });
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
