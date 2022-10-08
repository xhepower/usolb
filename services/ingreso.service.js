const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class IngresosService {
  constructor() {}

  async create(data) {
    const newIngreso = await models.Ingreso.create(data);
    return newIngreso;
  }

  async find(query) {
    const options = {
      include: ['concepto', 'cuenta'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { date_min, date_max } = query;
    if (date_min && date_max) {
      options.where.date = {
        [Op.gte]: date_min,
        [Op.lte]: date_max,
      };
    }
    const ingresos = await models.Ingreso.findAll(options);
    return ingresos;
  }

  async findOne(id) {
    const ingreso = await models.Ingreso.findByPk(id, {
      include: ['concepto', 'cuenta'],
    });
    if (!ingreso) {
      throw boom.notFound('ingreso not found');
    }
    if (ingreso.isBlock) {
      throw boom.conflict('ingreso is block');
    }
    return ingreso;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}

module.exports = IngresosService;
