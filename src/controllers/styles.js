const models = require('../models');

// queries the database to get back the correct styles,
// and constructs and object to send back
module.exports = {
  getStyles: async function(req, res) {
    const {product_id} = req.params;
    const styleRes = await models.styles.getStyleByProductId(product_id);
    const results = styleRes.rows;
    res.send(results);
  },
};

