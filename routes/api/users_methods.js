var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api/users', function(req, res) {
  res.send('this is the users resource');
});

module.exports = router;
