const models = require('../models');

module.exports = {
  getProducts: async (req, res) => {
    const {page, count} = req.query;
    const {rows} = await models.products.getAll(page, count);
    res.send(rows);
  },

  getProductDetail: async function(req, res) {
    const {product_id} = req.params;
    const [resProduct, resFeature] = await Promise.all([
      models.products.getOne(product_id),
      models.products.getFeatures(product_id),
    ]);
    const dataProduct = resProduct.rows[0];
    const dataFeatures = resFeature.rows;
    res.send({...dataProduct, features: dataFeatures});
  },
};
