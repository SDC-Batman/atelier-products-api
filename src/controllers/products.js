const models = require('../models');

module.exports = {
  getProducts: async (req, res) => {
    const {page, count} = req.query;
    const {rows} = await models.products.getAll(page, count);
    res.send(rows);
  },

  getProductDetail: function() {

  },
};
