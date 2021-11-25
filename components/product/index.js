const express = require('express');
const router = express.Router();
const productController = require('./productController');

/* GET home page. */
router.get('/',productController.productTable );

router.get('/all_product',productController.productTable);


router.get('/s',function(req,res){
    res.render("./find_form", {title: "search form"});
});

router.post('/s',productController.findProductById);



router.get('/delete',function(req,res) {
    res.render("./find_form",{title: "find with id"});
});

router.post('/delete',productController.deleteProductWithID);

module.exports = router;