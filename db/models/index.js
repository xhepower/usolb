const { User, UserSchema } = require('./user.model');
const { Pdf, PdfSchema } = require('./pdf.model');
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Pdf.init(PdfSchema, Pdf.config(sequelize));
}

module.exports = setupModels;
