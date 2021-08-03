var schedule = require('node-schedule');
var Axios = require("axios");
var fs = require("fs");

//............................
var createError = require('http-errors');
var express = require('express');
var path = require('path');

var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var top100 = require("./routes/getTop100.js");
var user = require("./routes/getUser.js");
var avatarsSteam = require("./routes/getSteamAvatars.js");
var app = express();

//passport / STEAM auth
const port = 9000;
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");
const authRoutes = require("./routes/auth-routes");
const mongoose = require("mongoose");
const keys = require("./config/keys");
var cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");

mongoose.connect(keys.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true} , () => {
    console.log("connected to mongo db");
  });
  
  app.use(
    cookieSession({
      name: "session",
      keys: [keys.COOKIE_KEY],
      maxAge: 24 * 60 * 60 * 1000 //24Hours
    })
  );
  
  // parse cookies
  app.use(cookieParser());
  
  // initalize passport
  app.use(passport.initialize());
  // deserialize cookie from the browser
  app.use(passport.session());
  
  // set up cors to allow us to accept requests from our client
  app.use(
    cors({
      origin: "http://dev.wojciechbajer.com", // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
    })
  );
  
  // set up routes
  app.use("/auth", authRoutes);
  
  const authCheck = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        authenticated: false,
        message: "user has not been authenticated"
      });
    } else {
      next();
    }
  };
  
  // if it's already login, send the profile response,
  // otherwise, send a 401 response that the user is not authenticated
  // authCheck before navigating to home page
  app.get("/", authCheck, (req, res) => {
    return res.status(200).json({
      authenticated: true,
      message: "user successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/top100', top100);
app.use('/user/:user_id', user);
app.use("/SteamData/avatars/:user_id", avatarsSteam);

//console.log(__dirname);
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