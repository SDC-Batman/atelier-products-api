/* eslint-disable camelcase */
const models = require('../models');
const services = require('../services');

module.exports = {
  getProducts: async (req, res) => {
    const {page, count} = req.query;
    const {rows} = await models.products.getAll(page, count);
    res.send(rows);
  },

  getProductDetail: async function(req, res) {
    const {product_id} = req.params;
    const result = await services.buildProductByIdResponse(product_id);
    res.send(result);
  },
};
