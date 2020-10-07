var express = require('express')
var bodyParser = require("body-parser");
const csrf = require("csurf");
var cookieParser = require("cookie-parser")
var admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://assab-autentification.firebaseio.com",
});

const csrfMiddleware = csrf({cookie: true});
var createError = require('http-errors');

var path = require('path');
var logger = require('morgan');

// the app object
var app = express();

app.use(express.static("static"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);
app.engine("html", require("ejs").renderFile);


app.all("*", (req,res,next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
})

app.get("/login", function (req, res) {
  res.render("login.html");
});

app.get("/signup", function (req, res) {
  res.render("signup.html");
});

app.get("/profile", function (req, res) {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true) // checkRevoked 
    .then(() => {
      res.render("profile.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

app.get("/", function (req, res) {
  res.render("index.html");
});

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

// router objects
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var adminRouter = require('./routes/admin');

// view engine config 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// configure app to use these routes
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/admin', adminRouter);


// catch 404, forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// respond to favicon requests with 204 no content 
app.get('/favicon.ico', (req, res) => res.sendStatus(204));



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// expose this app to scripts that require it, i.e. myapp/bin/www
module.exports = app;

/*
var express = require('express')

var createError = require('http-errors');

var path = require('path');
var logger = require('morgan');

// the app object
var app = express();


// router objects
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var adminRouter = require('./routes/admin');

// view engine config 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// configure app to use these routes
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/admin', adminRouter);

// catch 404, forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// respond to favicon requests with 204 no content 
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// expose this app to scripts that require it, i.e. myapp/bin/www
module.exports = app;



/*
//A REMETTRE 
var express = require('express')
var bodyParser = require("body-parser");
const csrf = require("csurf");
var cookieParser = require("cookie-parser")
var admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://assab-autentification.firebaseio.com",
});

const csrfMiddleware = csrf({cookie: true});
var createError = require('http-errors');

var path = require('path');
var logger = require('morgan');

// the app object
var app = express();

app.use(express.static("static"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);
app.engine("html", require("ejs").renderFile);


app.all("*", (req,res,next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
})

app.get("/login", function (req, res) {
  res.render("login.html");
});

app.get("/signup", function (req, res) {
  res.render("signup.html");
});

app.get("/profile", function (req, res) {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true) // checkRevoked 
    .then(() => {
      res.render("profile.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});

app.get("/", function (req, res) {
  res.render("index.html");
});

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

// router objects
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var adminRouter = require('./routes/admin');

// view engine config 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// configure app to use these routes
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/admin', adminRouter);

// catch 404, forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// respond to favicon requests with 204 no content 
app.get('/favicon.ico', (req, res) => res.sendStatus(204));



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// expose this app to scripts that require it, i.e. myapp/bin/www
module.exports = app;
*/