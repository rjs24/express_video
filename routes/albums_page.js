var express = require('express');
var router = express.Router();

/* GET albumss listing. */
router.get('/albums', function(req, res) {
  res.send('this is albums page');
});

module.exports = router;