require('dotenv').config();

const {Pool} = require('pg');
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'atelier',
  password: process.env.PASSWORD,
  port: 3000,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
