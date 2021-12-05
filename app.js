const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const passport = require('./components/auth/passport');
const session = require("express-session");

//---------------------------------------- app define router ----------------------------------------------------------

// define admin router
const adminRouter = require("./components/admin");

// define product router in component folder
const productRouter = require("./components/product");

// define router products
const productsRouter = require("./components/products");

// define accounts router
const accountsRouter = require("./components/accounts");

// define search router
const searchRouter = require("./components/search_bar");

// define account router
const accountRouter = require("./components/account");

// define register router
const registerRouter = require("./components/auth/register_router");

// define login router
const loginRouter = require("./components/auth/login_router");


////////////////////////////////////////////////////////////////////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
// this middleware will parse the http request to json object
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// use session middle ware with it secret key so we have a secure session id to transfer to client
app.use(session({
  secret: process.env.SESSION_SECRET, resave: true,
  saveUninitialized: false,
}));

// two middle ware below are use to check if user were logged in or not
app.use(passport.initialize());
app.use(passport.session());


app.use(function (req, res, next) {
  // if the user is authenticated when he or she send HTTP req there a cookie in there have the info of user
  // so in this middleware we capture that info and send back to the client
  res.locals.user = req.user;
  //res.locals.authenticated = !req.user.anonymous;
  next();
});

/////////////////////////////////////////////////////////////////////////////////////
// ROUTING  MIDDLEWARE GO HERE
// middleware for adminIndexPage
app.use("/", adminRouter);

// middleware for productlist task
app.use("/product", productRouter);

// use middleware for products
app.use("/products", productsRouter);

// use middleware for accounts tasks
app.use("/accounts", accountsRouter);

// use middleware for account tasks
app.use("/account", accountRouter);

// use middleware for searching
app.use("/search", searchRouter);

//routing for add admin account
app.use("/register", registerRouter);

//login routing
app.use("/login", loginRouter);
//default find by id form
app.get("/find_by_id_form", (req, res, next) => {
  res.render("find_form");
})





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

module.exports = app;
