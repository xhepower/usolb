//const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CuentasService {
  constructor() {}

  async create(data) {
    const newCuenta = await models.Cuenta.create(data);
    return newCuenta;
  }

  async find() {
    const options = {
      include: ['ingresos'],
      where: {},
    };

    const cuentas = await models.Cuenta.findAll(options);
    return cuentas;
  }

  async findOne(id) {
    const cuenta = await models.Cuenta.findByPk(id, {
      include: ['ingresos'],
    });
    if (!cuenta) {
      throw boom.notFound('cuenta not found');
    }
    if (cuenta.isBlock) {
      throw boom.conflict('cuenta is block');
    }
    return cuenta;
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

module.exports = CuentasService;
