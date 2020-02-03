var express = require('express');
var router = express.Router();

/* GET admin listing. */
router.get('/admin', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;