var express = require('express');
var pg = require('pg');
var router = express.Router();

/* GET all announcements. */
router.get('/list', function(req, res) {

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        data: err
      });
    } else {
      client.query('SELECT * FROM announcements ORDER BY sort DESC', function(err, result) {
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

  var data = {
    title: req.body.title,
    content: req.body.content,
    status: req.body.status || 'normal',
    sort: 0
  }

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) {
      done();
      console.error(err);
      return res.status(500).json({
        success: false, data: err
      });

    } else {

      client.query('SELECT sort FROM announcements ORDER BY sort DESC NULLS LAST LIMIT 1', function (err, result) {
        if (err) {
          done();
          console.error(err);
          return res.status(500).json({
            success: false, data: err
          });

        } else {

          if (result.rowCount > 0) {
            console.log(result.rows[0]);
            data.sort = result.rows[0].sort + 1;
          }

          client.query('INSERT INTO announcements(title, content, status, sort) values($1, $2, $3, $4)', [data.title, data.content, data.status, data.sort], function(err, result) {
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
      })
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
      client.query('UPDATE announcements SET title = $1, content = $2, status = $3, sort = $4 WHERE id = $5', [req.body.title, req.body.content, req.body.status, req.body.sort, req.body.id], function(err, result) {
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
            data: 'Announcement not found'
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
      client.query('DELETE FROM announcements WHERE id=$1', [req.body.id], function(err, result) {
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
            data: 'Announcement not found'
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
