'use strict';

const { USER_TABLE } = require('./../models/user.model');
const { INGRESO_TABLE } = require('./../models/ingreso.model');
const { EGRESO_TABLE } = require('./../models/egreso.model');
const { CUENTA_TABLE } = require('./../models/cuenta.model');
const { CONCEPTO_TABLE } = require('./../models/concepto.model');
const { PDF_TABLE } = require('./../models/pdf.model');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      recoveryToken: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
        field: 'recovery_token',
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'usuario',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
    //# de aqui////////////////

    await queryInterface.createTable(CONCEPTO_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(CUENTA_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(PDF_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      idNumber: {
        type: Sequelize.DataTypes.STRING,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.createTable(INGRESO_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      descripcion: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      monto: {
        type: Sequelize.DataTypes.INTEGER,
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
    });
    await queryInterface.createTable(EGRESO_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      descripcion: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      monto: {
        type: Sequelize.DataTypes.INTEGER,
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
    });
    //hasta aqui
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(INGRESO_TABLE);
    await queryInterface.dropTable(EGRESO_TABLE);
    await queryInterface.dropTable(CUENTA_TABLE);
    await queryInterface.dropTable(CONCEPTO_TABLE);
    await queryInterface.dropTable(PDF_TABLE);
  },
};
