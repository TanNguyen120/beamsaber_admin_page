const express = require("express");
const router = express.Router();
const accountController = require("./accountController");




//----------------------------------------------------------------------------------
router.get('/resource', (req, res) => {
    res.render("./account/account_find_form", { title: "Find User By ID" })
})

router.post("/resource", accountController.editAccount);

router.get("/:id/profile", accountController.userProfile);

router.post("/:id/profile", accountController.updateProfile);

router.delete("/resource/:id", accountController.removeAccount);


module.exports = router;