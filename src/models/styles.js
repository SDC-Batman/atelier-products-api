const db = require('../db');

module.exports = {
  getStyleByProductId: function(pId) {
    return db.query(`
      SELECT id, name, sale_price, original_price, default
      FROM features
      WHERE product_id = ${pId}
    `);
  },

  getPhotosByProductId: function(pId) {
    return db.query(`
    SELECT thumbnail_url, url
    FROM photos
    WHERE style_id = (
      SELECT id
      FROM styles
      WHERE product_id = pId
    )
    `);
  },

  getSkusByStyleId: function(sId) {

  }
};