var express = require('express');
var router = express.Router();

/* GET albumss listing. */
router.get('/api/albums', function(req, res) {
  res.send('this is albums resource');
});

module.exports = router;