const models = require('../models');

// queries the database to get back the correct styles,
// and constructs and object to send back
module.exports = {
  getStyles: async function(req, res) {
    const {product_id} = req.params;
    const styleRes = await models.styles.getNested(product_id);
    const results = styleRes.rows;
    res.send(results);
  },

  getObject: async function(req, res) {
    const {product_id} = req.params;
    const result = {"product_id": product_id};
    const styles = [];

    // get the styles for related product
    // get the skus and photos for each style id
    const stylesInfo = await models.styles.getStylesByProductId(product_id);
    for (let i = 0; i < stylesInfo.rows.length; i ++) {
      const style = stylesInfo.rows[i];
      console.log(style);
      const [resphotos, ressku] = await Promise.all([
        models.styles.getPhotosByStyleId(style.id),
        models.styles.getSkusByStyleId(style.id),
      ]);
      style.photos = resphotos.rows;
      Object.assign(style, ressku.rows[0]);
      styles.push(style);
    };
    result.results = styles;
    res.send(result);
  },
};

