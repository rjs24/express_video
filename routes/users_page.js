var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res) {
  return res.render('pages/users');
});

module.exports = router;
