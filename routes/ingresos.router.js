const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const IngresosService = require('./../services/ingreso.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createIngresoSchema,
  updateIngresoSchema,
  getIngresoSchema,
  queryIngresoSchema,
} = require('./../schemas/ingreso.schema');

const router = express.Router();
const service = new IngresosService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'editor'),
  validatorHandler(queryIngresoSchema, 'query'),
  async (req, res, next) => {
    try {
      const ingresos = await service.find(req.query);
      res.json(ingresos);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'editor'),
  validatorHandler(getIngresoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const ingreso = await service.findOne(id);
      res.json(ingreso);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'editor'),
  validatorHandler(createIngresoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newIngreso = await service.create(body);
      res.status(201).json(newIngreso);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('editor'),
  validatorHandler(getIngresoSchema, 'params'),
  validatorHandler(updateIngresoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const ingreso = await service.update(id, body);
      res.json(ingreso);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('editor'),
  validatorHandler(getIngresoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
