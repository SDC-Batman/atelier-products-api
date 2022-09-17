require('dotenv').config();

const {Pool} = require('pg');
const pool = new Pool({
  user: 'me',
  database: 'atelier',
  port: 5432,
});

// module.exports = pool;

module.exports = {
  query: (text, params) => pool.query(text, params),
};

