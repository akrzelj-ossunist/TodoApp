// utils/comparePassword.js
const bcrypt = require('bcrypt');

const comparePasswords = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = comparePasswords;