const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(60);

const createConceptoSchema = Joi.object({
  name: name.required(),
});

const updateConceptoSchema = Joi.object({
  name: name,
});

const getConceptoSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createConceptoSchema,
  updateConceptoSchema,
  getConceptoSchema,
};
