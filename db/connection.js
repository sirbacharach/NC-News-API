const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";
const pathToEnvFile = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({ path: pathToEnvFile });
const PGDATABASE = process.env.PGDATABASE;
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set")
}

const config = {};

if(ENV === 'production') {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
}

console.log(`currently connected to ${PGDATABASE}`);

module.exports = new Pool(config)