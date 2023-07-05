const { User } = require('../models');

const userData = [
  {
    username: 'Mike Jones',
    password: 'password123'
  },
  {
    username: 'Daniel Covington',
    password: 'password123'
  },
  {
    username: 'testuser',
    password: 'password123'
  },
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;