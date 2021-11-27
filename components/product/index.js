const express = require("express");
const router = express.Router();
const productController = require("./productController");

/* GET home page. */
router.get("/", productController.productTable);

// GET PRODUCT TABLE
router.get("/all_product", productController.productTable);

// Search product form
router.get("/s", function(req, res) {
    res.render("./find_form", { title: "search form" });
});

router.post("/s", productController.findProductById);

// delete product relate router

router.get("/delete", function(req, res) {
    res.render("./find_form", { title: "find with id" });
});

router.post("/delete", productController.deleteProductWithID);

// add product relate router
router.get("/add", function(req, res) {
    res.render("./product/product_add_form", { title: "add product" });
});


//-------------------------------------------------------------------------------------------------------------------------------------
const multer = require("multer");
const path = require("path");
const fs = require("fs");



const storage = multer.diskStorage({
    /**
     * Define where to save images
     *
     * @param {*} req req body of form dat
     * @param {*} file req file of form data
     * @param {*} cb call back function
     */
    destination: function(req, file, cb) {
        const destination =
            "public/assets/beam_saber_images/product_imgs/" + req.body.name;

        console.log("!!!!!!!!!!!!!! " + destination);
        const dir = destination;
        // check if dir exists if not create one
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log("making this directory:  " + dir);
        }
        cb(null, destination);
    },
    filename: function(req, file, cb) {
        cb(null, req.body.name + path.extname(file.originalname)); //Appending extension this is from Stack OverFlow
    },
});

// save file to storage with storage engine

// middleware for upload files
const upload = multer({ storage: storage });


//-------------------------------------------------------------------------------------------------------------------------------------



// this router use two middle ware to do it job 
router.post(
    "/add",
    upload.single("image_file"),
    productController.addProductTextInfo
);
// seacrh bar router
router.get("/search", function(req, res) {
    res.render("/index");
});
router.post("/search", productController.findProductWithCondition);

// edit product routers
router.get("/edit", productController.productTable);

router.post("/edit", productController.editProductWithPostValue);

// upload product picture router
router.get("/upload", (req, res) => {
    res.render("./find_form", { title: "upload picture" });
});

//-------------------------------------------------------------------------------------------------------------------------------------






module.exports = router;