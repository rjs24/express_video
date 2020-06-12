'use strict'
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('app');

var app = express();

// view engine setup
app.set('views', path.join(path.resolve(), 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))


app.set('routes', path.join(path.resolve(), 'routes'));
const loginRouter = require('./routes/login');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users_page');
const videosRouter = require('./routes/albums_page');
const adminRouter = require('./routes/admin_page');
const user_apis = require('./routes/api/users_methods');

app.get('/login', loginRouter);
app.get('/', indexRouter);
app.get('/users', usersRouter);
app.get('/albums', videosRouter);
app.get('/admin', adminRouter);
app.get('/api/users/', user_apis);
app.post('/api/users/', user_apis);
app.put('/api/users/', user_apis);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(err.debug);
});
app.listen(3001)
module.exports = app;
