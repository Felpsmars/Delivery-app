const validUser = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const invalidUser = {
  name: 'Cliente Zé Birita',
  password: '$#zebirita#$',
};

const databaseUser = {
  dataValues: {
    id: 1,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  }
};

module.exports = {
  validUser,
  invalidUser,
  databaseUser,
}