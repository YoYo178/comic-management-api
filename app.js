const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);

// 404 page
app.get("/404", (req, res) => {
  res.send("NOT FOUND").status(404);
})

// No matching routes found, redirect to 404 page
app.use(function(req, res, next) {
  res.redirect("/404")
});

module.exports = app;
