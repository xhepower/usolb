const Joi = require('joi');

const id = Joi.number().integer();
const descripcion = Joi.string().min(10);
const monto = Joi.number();
const tipo = Joi.string().valid('Efectivo', 'Transferencia', 'Retiro');
const cuentaId = Joi.number().integer();
const conceptoId = Joi.number().integer();
const date_min = Joi.date();
const date_max = Joi.date();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createIngresoSchema = Joi.object({
  descripcion: descripcion,
  monto: monto.required(),
  tipo: tipo.required(),
  cuentaId: Joi.when('tipo', {
    is: 'Efectivo',
    then: cuentaId,
    otherwise: cuentaId.required(),
  }),
  conceptoId: Joi.when('tipo', {
    is: 'Retiro',
    then: conceptoId,
    otherwise: conceptoId.required(),
  }),
});

const updateIngresoSchema = Joi.object({
  descripcion: descripcion,
  monto: monto,
  tipo: tipo,
  cuentaId: cuentaId,
  conceptoId: conceptoId,
});

const getIngresoSchema = Joi.object({
  id: id.required(),
});

const queryIngresoSchema = Joi.object({
  limit,
  offset,
  date_min,
  date_max: Joi.when('date_min', {
    is: Joi.exist(),
    then: date_max.required(),
  }),
});

module.exports = {
  createIngresoSchema,
  updateIngresoSchema,
  getIngresoSchema,
  queryIngresoSchema,
};
