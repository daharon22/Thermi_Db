const appRoot = require("app-root-path");
const dotenv = require("dotenv").config();

var session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session);
const environment = process.env.NODE_ENV || 'development'
const knexConfig = appRoot.require('db/knexfile');
const Knex = require('knex')(knexConfig[environment]);
const store = new KnexSessionStore({knex:Knex});


var logger = appRoot.require('/config/winston');
var i18n = require('i18n');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
i18n.configure(
  {
    cookie: 'lang',
    autoreload: true,
    register: global,
    directory: appRoot.resolve('/locales')
  }
);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signupRouter');
var loginRouter = require('./routes/loginRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false,
  maxAge: 1000*60*30 },
  store: store
}))
app.use(morgan('combined', {stream: logger.stream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);


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
  res.render('error');
});

module.exports = app;
