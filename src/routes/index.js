const Router = require('express-promise-router');
const controller = require('../controllers');
const router = new Router();


// url path for getting all the products
router.get('/products', controller.products.getProducts);

// url path for getting details of a certain product
router.get('/products/:product_id', controller.products.getProductDetail);

// url path for getting styles for a given product id
router.get(
    '/products/:product_id/styles', controller.styles.getProductWithStyles,
);

router.get(
    '/products/:product_id/related', controller.related.getRelatedProducts,
);

module.exports = router;
