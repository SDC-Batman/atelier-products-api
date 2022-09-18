const db = require('../db');

module.exports = {
  getStyleByProductId: function(pId) {
    return db.query(`
      SELECT json_agg(results) as results
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
            ) AS photos,
            (
              SELECT json_object_agg
              (
                outSku.id, (
                  SELECT row_to_json(sq)
                  FROM(
                    SELECT
                      inSku.size,
                      inSku.quantity
                    FROM skus as inSku
                    WHERE inSku.id = outSku.id
                  ) as sq
                )
              )
              FROM skus as outSku
              WHERE outSku.styleId = styles.id
            ) AS skus
          FROM styles
          WHERE styles.product_id = ${pId}
      ) as results
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
