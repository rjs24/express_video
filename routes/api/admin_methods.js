var express = require('express');
var router = express.Router();

/* GET admin listing. */
router.get('/api/admin', function(req, res) {
  res.send('This is the admin page');
});

module.exports = router;