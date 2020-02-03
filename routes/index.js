const express = require('express');
const home = express.Router();

/* GET home page. */
home.get('/', function(req, res, next) {
  return res.render('index.ejs');
  next();
});

module.exports = home;
