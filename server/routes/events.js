var express = require('express');
var router = express.Router();


const Pool = require('pg').Pool;
const url = require('url');

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const ssl = !(process.env.POSTGRESQLNOSSL=='true');

console.log('SSL enabled: ' + ssl);

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: ssl
};


const pool = new Pool(config);



/* GET all events. */
router.get('/list', function(req, res) {

  pool.query('SELECT * FROM events', function(err, result) {
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

});


router.put('/create', (req, res) => {

  const data = {
    'title': req.body.title
  };

  pool.query('INSERT INTO events(title) values($1)', [data.title], function(err) {
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
});

router.post('/edit', (req, res) => {

  pool.query('UPDATE events SET title = $1 WHERE id = $2', [req.body.title, req.body.id], function(err, result) {
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

});

router.delete('/delete', (req, res) => {

  pool.query('DELETE FROM events WHERE id=$1', [req.body.id], function(err, result) {
    //done();
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

});

module.exports = router;
