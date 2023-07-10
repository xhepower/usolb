const express = require('express');

const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const pdfsRouter = require('./pdfs.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/pdfs', pdfsRouter);
}

module.exports = routerApi;
