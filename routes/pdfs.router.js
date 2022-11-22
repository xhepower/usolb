const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const PdfService = require('./../services/pdf.service');
const validatorHandler = require('./../middlewares/validator.handler');
const multer = require('multer');
const fs = require('fs');
const EasyFtp = require('easy-ftp');
//const fetch = require('node-fetch');
const ftp = new EasyFtp();
const storage = multer.diskStorage({
  destination: 'pdfs',
  filename: function (req, file, cb) {
    cb(null, req.body.filename);
  },
});

const upload = multer({ storage: storage });
/*const upload = multer({
  dest: 'pdfs',
  filename: function (req, file, cb) {
    cb(null, req.body.filename);
  },
});*/

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
router.get('/archivos', async (req, res, next) => {
  try {
    const pdfs = fs.readdirSync('pdfs');
    res.json(pdfs);
  } catch (error) {
    next(error);
  }
});
router.get('/archivos/:file', async (req, res, next) => {
  try {
    const { file } = req.params;
    res.setHeader('Content-type', 'application/pdf');
    res.setHeader('Content-disposition', 'inline; filename="' + file + '"');
    res.download(`${__dirname}/../pdfs/archivos/${file}`);
  } catch (error) {
    next(error);
  }
});

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
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
});
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
