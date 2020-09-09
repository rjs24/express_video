const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res) {
  return res.render('pages/users', {'user':""});
});

module.exports = router;
