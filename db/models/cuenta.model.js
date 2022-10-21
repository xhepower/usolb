const { Model, DataTypes, Sequelize } = require('sequelize');

const CUENTA_TABLE = 'cuentas';

const CuentaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
};

class Cuenta extends Model {
  static associate(models) {
    this.hasMany(models.Ingreso, {
      as: 'ingresos',
      foreignKey: 'cuentaId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUENTA_TABLE,
      modelName: 'Cuenta',
      timestamps: false,
    };
  }
}

module.exports = { Cuenta, CuentaSchema, CUENTA_TABLE };
