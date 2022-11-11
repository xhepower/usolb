const Joi = require('joi');

const id = Joi.number().integer();
const idNumber = Joi.string();
const name = Joi.string();
const city = Joi.string();
const address = Joi.string();
const phone = Joi.string();
const email = Joi.string();
const passport = Joi.string();
const purpose = Joi.string();
const issued = Joi.string();
const refused = Joi.string();
const file = Joi.string();
const photo = Joi.binary();
const barcode = Joi.binary();
const date = Joi.date();
const estado = Joi.string();
/*
 idNumber: ,
      name: ,
      city: ,
      address: ,
      phone: ,
      email: ,
      passport: ,
      purpose: ,
      issued: ,
      refused: ,
      file: ,
*/

const createPdfSchema = Joi.object({
  name: name,
  idNumber: idNumber,
  city: city,
  address: address,
  phone: phone,
  email: email,
  passport: passport,
  purpose: purpose,
  issued: issued,
  refused: refused,
  file: file,
  date: date,
  photo: photo,
  barcode: barcode,
  estado: estado,
});

const updatePdfSchema = Joi.object({
  name: name,
});

const getPdfSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPdfSchema,
  updatePdfSchema,
  getPdfSchema,
};
