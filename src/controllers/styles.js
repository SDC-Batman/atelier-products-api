/* eslint-disable camelcase */
const models = require('../models');
const services = require('../services');

// queries the database to get back the correct styles,
// and constructs and object to send back
module.exports = {
  getStyles: async function(req, res) {
    const {product_id} = req.params;
    const styleRes = await models.styles.getNested(product_id);
    const results = styleRes.rows;
    res.send(results);
  },

  getProductWithStyles: async function(req, res) {
    const {product_id} = req.params;
    // calls the function to build the response object
    const result = await services.buildProductStylesResponse(product_id);
    res.send(result);
  },
};

