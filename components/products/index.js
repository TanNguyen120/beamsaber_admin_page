const express = require("express");
const router = express.Router();
const productsController = require("./productsController");


router.get("/all", productsController.productTable);

router.get("/list",productsController.searchWithCondition);

//router.post("/", productsController.searchWithCondition);


module.exports = router;

