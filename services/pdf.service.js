//const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class PdfService {
  constructor() {}

  async create(data) {
    const guardado = await this.encontrarPDF(data.pdf);

    if (guardado == false) {
      try {
        const newPdf = await models.Pdf.create(data);
        return newPdf;
      } catch (error) {
        console.error(error);
      }
    }
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
    const pdf = await models.Pdf.findAll({ where: { pdf: filename } });
    if (!pdf) {
      throw boom.notFound('pdf not found');
    }
    if (pdf.isBlock) {
      throw boom.conflict('pdf is block');
    }
    return pdf;
  }
  async encontrarPDF(filename) {
    const pdf = await models.Pdf.findAll({ where: { pdf: filename } });
    //console.log(pdf);
    let rta;
    if (pdf.length === 0) {
      rta = false;
    } else {
      rta = true;
    }
    if (pdf.isBlock) {
      throw boom.conflict('pdf is block');
    }
    return rta;
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

module.exports = PdfService;
