function App(config){
  var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.connect('mongodb://'+config.db.host+'/todolistdb',{db: {native_parser: true}, server:{poolSize: 20}, user: config.db.user || undefined,password: config.db.password || undefined},function(err){
if(err){
console.error(err);
return process.exit(1);
}
return console.info('connected to mongoDB!');
});

var User = require('./lib/User')(mongoose,bcrypt);
var stubToDoListModel = require('./models/stubToDoListModel');
var ToDoListModel = require('./models/toDoListModel')(mongoose);

var todoListServices = require('./services/TodoListService')(ToDoListModel);
var indexRoute = require('./routes/IndexRoute')(express,User);
var todoListRoute = require('./routes/todoList')(express, todoListServices);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "wwefer234r34fqr3f",resave: false, saveUninitialized: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/list', todoListRoute);

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
  return app;
}

module.exports = App;
