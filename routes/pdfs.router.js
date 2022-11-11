const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const PdfService = require('./../services/pdf.service');
const validatorHandler = require('./../middlewares/validator.handler');
const multer = require('multer');
const EasyFtp = require('easy-ftp');
//const fetch = require('node-fetch');
const ftp = new EasyFtp();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'pdfs/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

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
  '/servepdf',

  async (req, res, next) => {
    try {
      res.download(
        'https://drive.google.com/uc?id=1j4iyu1RKhC5hhPrTeWSHpBS-IqP9nypj&export=download'
      );
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
  uploadStorage.single('file'),
  async (req, res, next) => {
    try {
      const title = req.body.title;
      const file = req.file;

      console.log(title);
      console.log(file);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  '/obtenerpdf',

  async (req, res, next) => {
    try {
      const config = {
        host: process.env.FTP_IP,
        port: 21,
        username: process.env.FTP_USERNAME,
        password: process.env.FTP_PASSWORD,
        type: 'ftp',
      };
      ftp.connect(config);
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
