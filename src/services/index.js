const models = require('../models');

module.exports = {
  // function that builds the product/:id/styles response
  buildProductStylesResponse: async function(pId) {
    const result = {'product_id': pId};
    const styles = [];

    // get the styles for related product
    // get the skus and photos for each style id
    const stylesInfo = await models.styles.getStylesByProductId(pId);
    for (let i = 0; i < stylesInfo.rows.length; i ++) {
      const style = stylesInfo.rows[i];
      // make the queries to get the related photos and skus
      const [resphotos, ressku] = await Promise.all([
        models.styles.getPhotosByStyleId(style.style_id),
        models.styles.getSkusByStyleId(style.style_id),
      ]);
      // add the skus and photos to object
      style.photos = resphotos.rows;
      Object.assign(style, ressku.rows[0]);
      styles.push(style);
    };
    result.results = styles;
    return result;
  },

  buildProductByIdResponse: async function(id) {
    const [resProduct, resFeature] = await Promise.all([
      models.products.getOne(id),
      models.products.getFeatures(id),
    ]);
    const dataProduct = resProduct.rows[0];
    const dataFeatures = resFeature.rows;
    return {...dataProduct, features: dataFeatures};
  },

  buildRelatedProductsResponse: async function(id) {
    const related = await models.related.getRelatedPRoducts(id);
    return (related.rows[0].result);
  },

};

