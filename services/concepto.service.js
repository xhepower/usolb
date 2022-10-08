//const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ConceptosService {
  constructor() {}

  async create(data) {
    const newConcepto = await models.Concepto.create(data);
    return newConcepto;
  }

  async find() {
    const options = {
      include: ['ingresos'],
      where: {},
    };

    const conceptos = await models.Concepto.findAll(options);
    return conceptos;
  }

  async findOne(id) {
    const concepto = await models.Concepto.findByPk(id, {
      include: ['ingresos'],
    });
    if (!concepto) {
      throw boom.notFound('concepto not found');
    }
    if (concepto.isBlock) {
      throw boom.conflict('concepto is block');
    }
    return concepto;
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

module.exports = ConceptosService;
