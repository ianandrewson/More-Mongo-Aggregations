require('dotenv').config();
require('./lib/utils/connect.js')();

const mongoose = require('mongoose');
const { seedData } = require('./lib/utils/seedData');

seedData()
  .then(() => console.log('data seeded'))
  .finally(() => mongoose.connection.close());
