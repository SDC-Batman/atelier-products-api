const models = require('../models');

// queries the database to get back the correct styles,
// and constructs and object to send back
module.exports = {
  getStyles: async function(req, res) {
    const {product_id} = req.params;
    const styleRes = await models.styles.getStyleByProductId(product_id);
    const {results} = styleRes.rows[0];
    res.send({product_id, results});
  },
};

