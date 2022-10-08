const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(60);

const createCuentaSchema = Joi.object({
  name: name.required(),
});

const updateCuentaSchema = Joi.object({
  name: name,
});

const getCuentaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCuentaSchema,
  updateCuentaSchema,
  getCuentaSchema,
};
