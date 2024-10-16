import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

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

export default app;
