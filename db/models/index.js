const { User, UserSchema } = require('./user.model');
const { Egreso, EgresoSchema } = require('./egreso.model');
const { Ingreso, IngresoSchema } = require('./ingreso.model');
const { Cuenta, CuentaSchema } = require('./cuenta.model');
const { Concepto, ConceptoSchema } = require('./concepto.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Egreso.init(EgresoSchema, Egreso.config(sequelize));
  Ingreso.init(IngresoSchema, Ingreso.config(sequelize));
  Cuenta.init(CuentaSchema, Cuenta.config(sequelize));
  Concepto.init(ConceptoSchema, Concepto.config(sequelize));

  //User.associate(sequelize.models);
  Egreso.associate(sequelize.models);
  Ingreso.associate(sequelize.models);
  Cuenta.associate(sequelize.models);
  Concepto.associate(sequelize.models);
}

module.exports = setupModels;
