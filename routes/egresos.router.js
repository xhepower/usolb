const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const EgresosService = require('./../services/egreso.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createEgresoSchema,
  updateEgresoSchema,
  getEgresoSchema,
  queryEgresoSchema,
} = require('./../schemas/egreso.schema');

const router = express.Router();
const service = new EgresosService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'editor'),
  validatorHandler(queryEgresoSchema, 'query'),
  async (req, res, next) => {
    try {
      const egresos = await service.find(req.query);
      res.json(egresos);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'editor'),
  validatorHandler(getEgresoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const egreso = await service.findOne(id);
      res.json(egreso);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'editor'),
  validatorHandler(createEgresoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newEgreso = await service.create(body);
      res.status(201).json(newEgreso);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('editor'),
  validatorHandler(getEgresoSchema, 'params'),
  validatorHandler(updateEgresoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const egreso = await service.update(id, body);
      res.json(egreso);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('editor'),
  validatorHandler(getEgresoSchema, 'params'),
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
