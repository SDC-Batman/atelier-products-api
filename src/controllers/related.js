const services = require('../services');

module.exports = {
  getRelatedProducts: async function(req, res) {
    // eslint-disable-next-line camelcase
    const {product_id} = req.params;
    const result = await services.buildRelatedProductsResponse(product_id);
    res.send(result);
  },
};
