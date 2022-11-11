const { Model, DataTypes, Sequelize } = require('sequelize');

const PDF_TABLE = 'pdfs';

const PdfSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER,
  },
  idNumber: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true,
    field: 'id_number',
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  city: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  address: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  phone: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  passport: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  purpose: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  issued: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  refused: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  file: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  date: {
    type: Sequelize.DataTypes.DATE,
    unique: false,
    allowNull: true,
  },
  photo: {
    type: Sequelize.DataTypes.STRING.BINARY,
    unique: false,
    allowNull: true,
  },
  barcode: {
    type: Sequelize.DataTypes.STRING.BINARY,
    unique: false,
    allowNull: true,
  },
  estado: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: true,
  },
  fileID: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    field: 'file_id',
    allowNull: true,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Pdf extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: PDF_TABLE,
      modelName: 'Pdf',
      timestamps: false,
    };
  }
}

module.exports = { Pdf, PdfSchema, PDF_TABLE };
