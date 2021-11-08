const bcrypt = require("bcryptjs");

function encryptPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
  encryptPassword,
  comparePassword,
};
