'use strict';

const { USER_TABLE } = require('./../models/user.model');
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
    await queryInterface.createTable(PDF_TABLE, {
      //   "date": "2022-08-09T06:00:00.000Z",
      // "name": "YOSELYN LIZETH PINEDA AYALA",
      // "idNumber": "1601199400025",
      // "city": "MACHOLOA",
      // "address": "CALLE PRINCIPAL SALIDA HACIA SAN NICOLAS",
      // "phone": "+50496070778",
      // "email": "lizethpineda93@icloud.com",
      // "passport": "G174603",
      // "purpose": "TEMP. BUSINESS PLEASURE VISITOR (B)",
      // "issued": "NO",
      // "archivo": "yoselyn lizeth.pdf",
      // "pdf": "1601199400025-G174603-9-7.pdf"
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
      date: {
        type: Sequelize.DataTypes.DATE,
        unique: false,
        allowNull: true,
      },
      pdf: {
        type: Sequelize.DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      computadora: {
        type: Sequelize.DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      oficina: {
        type: Sequelize.DataTypes.STRING,
        unique: false,
        allowNull: true,
      },
      archivo: {
        type: Sequelize.DataTypes.STRING,
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
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(USER_TABLE);

    await queryInterface.dropTable(PDF_TABLE);
  },
};
