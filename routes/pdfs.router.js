const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const PdfService = require('./../services/pdf.service');
const validatorHandler = require('./../middlewares/validator.handler');

const {
  createPdfSchema,
  updatePdfSchema,
  getPdfSchema,
} = require('./../schemas/pdf.schema');

const router = express.Router();
const service = new PdfService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'editor'),
  async (req, res, next) => {
    try {
      const pdfs = await service.find(req.query);
      res.json(pdfs);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'editor'),
  validatorHandler(getPdfSchema, 'params'),
  async (req, res, next) => {
    try {
      console.log(req.user);
      const { id } = req.params;
      const pdf = await service.findOne(id);
      res.json(pdf);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('editor'),
  validatorHandler(createPdfSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPdf = await service.create(body);
      res.status(201).json(newPdf);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/subir',
  passport.authenticate('jwt', { session: false }),
  checkRoles('editor'),
  async (req, res, next) => {
    try {
      console.log(req);
      /*console.log(req);
      const body = req.body;
      console.log(body);*/
      //const newPdf = await service.create(body);
      //res.status(201).json(newPdf);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('editor'),
  validatorHandler(getPdfSchema, 'params'),
  validatorHandler(updatePdfSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const pdf = await service.update(id, body);
      res.json(pdf);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('editor'),
  validatorHandler(getPdfSchema, 'params'),
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
