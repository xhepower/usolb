const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class EgresosService {
  constructor() {}

  async create(data) {
    const newEgreso = await models.Egreso.create(data);
    return newEgreso;
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
    const egresos = await models.Egreso.findAll(options);
    return egresos;
  }

  async findOne(id) {
    const egreso = await models.Egreso.findByPk(id, {
      include: ['concepto', 'cuenta'],
    });
    if (!egreso) {
      throw boom.notFound('egreso not found');
    }
    if (egreso.isBlock) {
      throw boom.conflict('egreso is block');
    }
    return egreso;
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

module.exports = EgresosService;
