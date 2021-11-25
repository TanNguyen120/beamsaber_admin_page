const express = require('express');
const router = express.Router();
const productController = require('./productController');

/* GET home page. */
router.get('/',productController.productTable );


// GET PRODUCT TABLE 
router.get('/all_product',productController.productTable);

// Search product form
router.get('/s',function(req,res){
    res.render("./find_form", {title: "search form"});
});

router.post('/s',productController.findProductById);

// delete product relate router

router.get('/delete',function(req,res) {
    res.render("./find_form",{title: "find with id"});
});

router.post('/delete',productController.deleteProductWithID);


// add product relate router
router.get('/add', function(req, res){
    res.render("./product/product_add_form", {title: "add product"});
});

router.post('/add',productController.addProduct);

// seacrh bar router
router.get('/search', function(req, res){
    res.render("/index");
});
router.post('/search',productController.findProductWithCondition);

// edit product routers
router.get('/edit', productController.productTable);

router.post('/edit', productController.editProductWithPostValue);

module.exports = router;



