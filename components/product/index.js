const express = require("express");
const router = express.Router();
const productController = require("./productController");


// Middles ware for CRUDE product tables --------------------------------------------------------------------------------------------------------------
router.get("/resource",productController.findProductById);


// post a product will be handle by create_form

// update a product
router.post("/resource", productController.editProductWithPostValue);



// delete product relate router -----------------------------------------------------------------------------------------------------

router.get("/resource_remove_data",(req, res)=>{
    "find_form",{title:"resource_remove_data"}
});
router.post("/resource_remove_data", productController.deleteProductWithID);




// add product relate router ---------------------------------------------------------------------------------------------------------
router.get("/create_form", function (req, res) {
    res.render("./product/product_add_form", { title: "add product" });
});


//-------------------------------------------------------------------------------------------------------------------------------------
/*                                          This code block is for multer middleware  
 */

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
    destination: function (req, file, cb) {
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
    filename: function (req, file, cb) {
        cb(null, req.body.name + path.extname(file.originalname)); //Appending extension this is from Stack OverFlow
    },
});

// save file to storage with storage engine

// middleware for upload files
const upload = multer({ storage: storage });


//-------------------------------------------------------------------------------------------------------------------------------------



// this router use two middle ware first it use upload middleware from multer to store img file 
// then use our middleware to store the rest data plus the img link
router.post("/create_form",
    upload.single("image_file"),
    productController.addProductTextInfo
);


//-------------------------------------------------------------------------------------------------------------------------------------






module.exports = router;