var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login page');
});

module.exports = router;