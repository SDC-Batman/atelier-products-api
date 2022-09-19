const db = require('../db');

module.exports = {
  getRelatedPRoducts: function(id) {
    return db.query(`
    SELECT array_agg (
      related_product_id
    ) as related
    FROM related
    WHERE current_product_id = ${id}
  `);
  },
};
