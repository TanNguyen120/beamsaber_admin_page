const express = require("express");
const router = express.Router();
const accountsController = require("./accountsController");



// router for main page of accounts
router.get('/all',accountsController.accountsTable);

//----------------------------------------------------------------------------------
router.get('/resource', (req, res) => {
    res.render("./account/account_find_form",{title:"Find User By ID"})
})

router.post("/resource" ,(req, res) => {
    res.send("we know");
})


module.exports = router;