const express = require("express");
const router = express.Router();
const orderController = require("./orderController");

router.get("/", orderController.ordersTable);


router.post("/", orderController.editStatus);




module.exports = router;