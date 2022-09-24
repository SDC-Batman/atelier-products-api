const Router = require('express-promise-router');
const controller = require('../controllers');
const router = new Router();


// url path for getting all the products
router.get('/products', controller.products.getProducts);

// url path for getting details of a certain product
router.get('/products/:product_id', controller.products.getProductDetail);

// url path for getting styles for a given product id
router.get(
    '/products/:product_id/styles', controller.styles.getStyles,
);

router.get(
    '/products/:product_id/related', controller.related.getRelatedProducts,
);

router.get(
    '/loaderio-a9ee9afbb1e377e70eae8fa0ab27f05c',
    (req, res) => res.send('loaderio-a9ee9afbb1e377e70eae8fa0ab27f05c'),
);

module.exports = router;
