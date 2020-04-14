const express = require('express');
const home = express.Router();

/* GET home page. */
home.get('/', function(req, res, next) {
  return res.render('pages/index', {'user':""})
});

module.exports = home;
