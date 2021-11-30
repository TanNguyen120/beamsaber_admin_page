const express = require("express");
const router = express.Router();
const searchController = require("./searchController");


router.get("/", searchController.searchWithCondition);


//router.post("/", productsController.searchWithCondition);


module.exports = router;