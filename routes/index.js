const express = require('express');

const usersRouter = require('./users.router');

const conceptosRouter = require('./conceptos.router');
const cuentasRouter = require('./cuentas.router');
const ingresosRouter = require('./ingresos.router');
const egresosRouter = require('./egresos.router');
const authRouter = require('./auth.router');
const pdfsRouter = require('./pdfs.router');
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/ingresos', ingresosRouter);
  router.use('/egresos', egresosRouter);
  router.use('/cuentas', cuentasRouter);
  router.use('/conceptos', conceptosRouter);
  router.use('/auth', authRouter);
  router.use('/pdfs', pdfsRouter);
}

module.exports = routerApi;
