import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import "./db/db.js";

import apiRouter from "./routes/api/index.js";

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api', apiRouter);

// 404 page
app.get("/404", (req, res) => {
  res.send({ status: "failed", message: "Page not found." }).status(404);
})

// No matching routes found, redirect to 404 page
app.use((req, res, next) => {
  res.redirect("/404");
});

export default app;
