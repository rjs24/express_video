const express = require('express');
const login_p = express.Router();

/* GET login page. */
login_p.get('/login', function(req, res, next) {
  return res.render('pages/login');
  next();
});

module.exports = login_p;