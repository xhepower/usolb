const { Model, DataTypes, Sequelize } = require('sequelize');

const CONCEPTO_TABLE = 'conceptos';

const ConceptoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
}


class Concepto extends Model {

  static associate(models) {
    this.hasMany(models.Ingreso, {
      as: 'ingresos',
      foreignKey: 'conceptoId'
    });

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONCEPTO_TABLE,
      modelName: 'Concepto',
      timestamps: false
    }
  }
}

module.exports = { Concepto, ConceptoSchema, CONCEPTO_TABLE };
