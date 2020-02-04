var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res) {
  res.send('this is the users page');
});

module.exports = router;
