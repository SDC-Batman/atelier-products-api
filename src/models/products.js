const db = require('../db');

module.exports = {
  getAll: function(page = 1, count = 5) {
    const start = (page - 1) * count;
    return db.query(`SELECT * FROM products LIMIT ${count} OFFSET ${start}`);
  },
};
