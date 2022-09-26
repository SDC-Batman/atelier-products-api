const db = require('../db');

module.exports = {

  // builds a json object in the database and returns that object back
  // includes styles, sizes, quantity and photos from related tables
  getNested: function(pId) {
    return db.query(`
      SELECT json_agg(results) as results
      FROM (
          SELECT
            styles.style_id,
            styles.name,
            styles.sale_price,
            styles.original_price,
            styles.default_style,
            (
              SELECT json_agg(nestedSection)
              FROM(
                SELECT
                  photos.url,
                  photos.thumbnail_url
                FROM photos
                WHERE photos.styleid = styles.style_id
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
              WHERE outSku.id = styles.style_id
            ) AS skus
          FROM styles
          WHERE styles.product_id = ${pId}
      ) as results
    `);
  },


  getStylesByProductId: function(pId) {
    return db.query(`
      SELECT
        style_id,
        name,
        sale_price,
        original_price,
        default_style as default
      FROM styles
      WHERE product_id = ${pId}
    `);
  },

  getSkusByStyleId: function(sId) {
    return db.query(`
    SELECT json_object_agg
    (
      s.id, (
        SELECT row_to_json(sq)
        FROM(
          SELECT
            inSku.quantity,
            inSku.size
          FROM skus as inSku
          WHERE inSku.id = s.id
        ) as sq
      )
    ) as skus
    FROM skus as s
    WHERE s.styleId = ${sId}
    `);
  },

  getPhotosByStyleId: function(sId) {
    return db.query(`
    SELECT thumbnail_url, url
    FROM photos
    WHERE styleId = ${sId}
    `);
  },
};
