const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');
const PdfService = require('./../services/pdf.service');
const validatorHandler = require('./../middlewares/validator.handler');
const fs = require('fs');
const path = require('path');
const { getPdfSchema } = require('./../schemas/pdf.schema');

const router = express.Router();
const service = new PdfService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
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
  '/archivos',
  passport.authenticate('jwt', { session: false }),
  checkRoles('user', 'editor'),
  async (req, res, next) => {
    try {
      const pdfs = fs.readdirSync('pdfs');
      res.json(pdfs);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/archivos/:file',
  //passport.authenticate('jwt', { session: false }),

  async (req, res, next) => {
    try {
      const { file } = req.params;
      const filePath = path.join(process.cwd(), 'pdfs', file);
      console.log(filePath);
      res.setHeader('Content-type', 'application/pdf');
      res.setHeader('Content-disposition', 'inline; filename="' + file + '"');
      // res.sendFile(`./pdfs/${file}`);
      res.sendFile(filePath);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/barcodes/:file',
  // passport.authenticate('jwt', { session: false }),

  async (req, res, next) => {
    try {
      const { file } = req.params;
      const fileSE = pdfSinExtension(file);
      const filePath = path.join(process.cwd(), 'barcodes', `${fileSE}.png`);
      console.log(filePath);
      res.setHeader('Content-type', 'image/png');
      res.setHeader('Content-disposition', 'inline; filename="' + file + '"');
      // res.sendFile(`./pdfs/${file}`);
      res.sendFile(filePath);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  '/photos/:file',

  async (req, res, next) => {
    try {
      const { file } = req.params;
      const fileSE = pdfSinExtension(file);
      const filePath = path.join(process.cwd(), 'photos', `${fileSE}.png`);
      console.log(filePath);
      res.setHeader('Content-type', 'image/png');
      res.setHeader('Content-disposition', 'inline; filename="' + file + '"');
      // res.sendFile(`./pdfs/${file}`);
      res.sendFile(filePath);
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
const pdfSinExtension = (pdf) => {
  return pdf.substring(0, pdf.length - 4);
};
router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      idNumber,
      city,
      address,
      phone,
      email,
      passport,
      purpose,
      issued,
      archivo,
      pdf,
      date,
      photo,
      barcode,
      file,
      computadora,
      oficina,
    } = req.body;
    const datos = {
      name: name,
      idNumber: idNumber,
      city: city,
      address: address,
      phone: phone,
      email: email,
      passport: passport,
      purpose: purpose,
      issued: issued,
      archivo: archivo,
      pdf: pdf,
      date: date,
      computadora: computadora,
      oficina: oficina,
    };
    try {
      let newPdf;
      const archivos = fs.readdirSync('./pdfs');
      const photos = fs.readdirSync('./photos');
      const subido = archivos.includes(pdf);
      const fotoSubido = photos.includes(pdf);
      //guardar el pdf

      newPdf = await service.create(datos);

      if (!subido) {
        fs.writeFileSync(`./pdfs/${pdf}`, file, {
          encoding: 'base64',
        });
      }
      if (!fotoSubido) {
        fs.writeFileSync(`./photos/${pdfSinExtension(pdf)}.png`, photo, {
          encoding: 'base64',
        });
      }
      fs.writeFileSync(`./barcodes/${pdfSinExtension(pdf)}.png`, barcode, {
        encoding: 'base64',
      });
      res.status(201).json(newPdf);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
