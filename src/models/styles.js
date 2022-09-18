const db = require('../db');

module.exports = {
  getStyleByProductId: function(pId) {
    return db.query(`
      SELECT (
        json_agg(
          json_build_object(
            'style_id', id,
            'name', name,
            'sale_price', sale_price,
            'original_price', original_price,
            'default?', default_style
          )
        )
      ) AS results
      FROM styles
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

  },
};
