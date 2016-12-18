var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


/* GET home page. */
router.get('/infoscreen', function(req, res) {
  res.render('infoscreen');
});



module.exports = router;
