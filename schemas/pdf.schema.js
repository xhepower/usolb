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
const archivo = Joi.string();
const pdf = Joi.string();
const computadora = Joi.string();
const oficina = Joi.string();

const createPdfSchema = Joi.object({
  name: name,
  idNumber: idNumber,
  city: city,
  address: address,
  phone: phone,
  email: email,
  passport: passport,
  purpose: purpose,
  archivo: archivo,
  pdf: pdf,
  issued: issued,
  computadora: computadora,
  oficina: oficina,
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
