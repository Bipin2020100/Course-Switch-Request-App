var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var srcRouter = require('./routes/src');

var app = express();

const MongoClient = require('mongodb').MongoClient;
let client = new MongoClient("mongodb+srv://lindsera1:477@cluster0.obbao.mongodb.net/admin?authSource=admin&replicaSet=atlas-tt0h4i-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true", { useUnifiedTopology: true });
let connection;
const { ObjectID } = require('mongodb');





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', (req, res, next) => {
  if (!connection) { // connect to database
    client.connect(function (err) {
      connection = client.db('CS571FP');
      req.db = connection;
      next();
    })
  } else { // 
    req.db = connection;
    next();
  }
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/src', srcRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);
