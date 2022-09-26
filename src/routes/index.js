const Router = require('express-promise-router');
const controller = require('../controllers');
const router = new Router();


// sends back summarized information on all the products
router.get('/products', controller.products.getProducts);

// send back information about a single product
router.get('/products/:product_id', controller.products.getProductDetail);

// send back styles, sizes, quantity and photos of a given product id
router.get(
    '/products/:product_id/styles', controller.styles.getProductWithStyles,
);

// send back ids of related products
router.get(
    '/products/:product_id/related', controller.related.getRelatedProducts,
);

router.get(
    '/loaderio-a9ee9afbb1e377e70eae8fa0ab27f05c',
    (req, res) => res.send('loaderio-a9ee9afbb1e377e70eae8fa0ab27f05c'),
);

module.exports = router;
