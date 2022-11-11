//const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class PdfsService {
  constructor() {}

  async create(data) {
    const newPdf = await models.Pdf.create(data);
    return newPdf;
  }

  async find(query) {
    const options = {
      where: {},
    };
    const { file } = query;
    if (file) {
      options.where.file = file;
    }
    const pdfs = await models.Pdf.findAll(options);
    return pdfs;
  }

  async servePDF() {}

  async findOne(id) {
    const pdf = await models.Pdf.findByPk(id, {});
    if (!pdf) {
      throw boom.notFound('pdf not found');
    }
    if (pdf.isBlock) {
      throw boom.conflict('pdf is block');
    }
    return pdf;
  }
  async findByFileName(filename) {
    const pdf = await models.Pdf.findAll({ where: { file: filename } });
    if (!pdf) {
      throw boom.notFound('pdf not found');
    }
    if (pdf.isBlock) {
      throw boom.conflict('pdf is block');
    }
    return pdf;
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

module.exports = PdfsService;
