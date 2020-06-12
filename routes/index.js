const express = require('express');
const route = express.Router();

/* GET home page. */
route.get('/', function(req, res, next) {
  return res.render('pages/index', {'user':"richard"})
});


/* GET users listing. */
route.get('/users', function(req, res) {
  return res.render('pages/users', {'user':""});
});



module.exports = route;
