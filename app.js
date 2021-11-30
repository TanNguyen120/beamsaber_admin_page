const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

//---------------------------------------- app define router ----------------------------------------------------------

// define admin router
const adminRouter = require("./components/admin/index");

// define product router in component folder
const productRouter = require("./components/product/index");

// define router products
const productsRouter = require("./components/products/index");

// define accounts router
const accountsRouter = require("./components/accounts/index");

// define search router
const searchRouter = require("./components/search_bar/index");

// define account router
const accountRouter = require("./components/account/index");

////////////////////////////////////////////////////////////////////////////////////////////////////


//-------------------------------- middleware use -----------------------------------------------------------------------



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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

//default find by id form
app.get("/find_by_id_form",(req, res, next)=>{
  res.render("find_form");
} )

// use middleware for searching
app.use("/search",searchRouter);


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
