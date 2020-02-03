var express = require('express');
var router = express.Router();

/* GET videos listing. */
router.get('/videos', function(req, res, next) {
  res.send('node_vid_service/views/Theme/tables.ejs');
});

module.exports = router;