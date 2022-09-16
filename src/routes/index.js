const Router = require('express').Router;
const controller = require('../controllers');
const router = new Router();

router.get('/products', controller.getProducts);


module.exports = router;
