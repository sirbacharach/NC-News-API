const devData = require('../data/development-data/index.js');
console.log(devData)
const seed = require('./seed.js');
const db = require('../connection.js');

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
