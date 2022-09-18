const db = require('../db');

module.exports = {
  getStyleByProductId: function(pId) {
    return db.query(`
      SELECT row_to_json(style) as p
      FROM (
        SELECT
          styles.id as style_id,
          styles.name,
          styles.sale_price,
          styles.original_price,
          styles.default_style,
          (
            SELECT json_agg(nestedSection)
            FROM(
              SELECT
                photos.url
              FROM photos
              WHERE photos.styleID = styles.id
            ) AS nestedSection
          ) AS photos
        FROM styles
        WHERE styles.product_id = ${pId}
      ) AS style
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
