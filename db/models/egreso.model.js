const { Model, DataTypes, Sequelize } = require('sequelize');

const { CUENTA_TABLE } = require('./cuenta.model');
const { CONCEPTO_TABLE } = require('./concepto.model');

const EGRESO_TABLE = 'egresos';

const EgresoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  monto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  cuentaId: {
    field: 'cuenta_id',
    allowNull: true,
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: CUENTA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  conceptoId: {
    field: 'concepto_id',
    allowNull: true,
    type: Sequelize.DataTypes.INTEGER,
    references: {
      model: CONCEPTO_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Egreso extends Model {
  static associate(models) {
    this.belongsTo(models.Cuenta, { as: 'cuenta' });
    this.belongsTo(models.Concepto, { as: 'concepto' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EGRESO_TABLE,
      modelName: 'Egreso',
      timestamps: false,
    };
  }
}

module.exports = { Egreso, EgresoSchema, EGRESO_TABLE };
