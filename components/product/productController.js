const productService = require("./productService");



// define the default path to save picture here

const saveDefaultPath = "/assets/beam_saber_images/product_imgs/";

// --------------------------------------------------------------------------------------------------------------

/**
 * find all item and pageination
 *
 */
exports.productTable = async function(req, res) {
    const page = parseInt(req.query.page);

    console.log(" client want find items in page: " + page);

    if (!isNaN(page) && page > 0) {
        const listOfProduct = await productService.listProductTable(page - 1, 12);
        res.render("./product/product_table", { listOfProduct, page });
    } else {
        const listOfProduct = await productService.listProductTable();

        res.render("./product/product_table", { listOfProduct, page: 1 });
    }
};

// --------------------------------------------------------------------------------------------------------------

/**
 *
 * find all item with pagniation when there are a post request
 * @param {*} req
 * @param {*} res
 */
exports.postProductTable = async function(req, res) {
    const page = parseInt(req.body.page);
    console.log(" client want find items in page: " + page);
    if (isNaN(page) && page > 0) {
        const listOfProduct = await productService.listProductTable(page, 12);
        res.render("./product/product_table", { listOfProduct, page });
    } else {
        const listOfProduct = await productService.listProductTable();
        res.render("./product/product_table", { listOfProduct, page });
    }
};

// --------------------------------------------------------------------------------------------------------------

/**
 *
 *Delete a product with matching id from the req.body.
 * @param {*} req
 * @param {*} res
 */
exports.deleteProductWithID = async function(req, res) {
    const id = parseInt(req.body.product_id);
    console.log("id is: " + id);
    if (!isNaN(id)) {
        await productService.deleteProduct(id);
        res.end("success");
    } else {
        res.end("fail");
        throw new Error("id is not valid");
    }
};

// --------------------------------------------------------------------------------------------------------------

/**
 *find product have matching id in req.body.
 *
 * @param {*} req
 * @param {*} res
 */
exports.findProductById = async function(req, res) {
    const id = req.body.product_id;
    console.log("id is " + id);
    if (!isNaN(id)) {
        const productDetails = await productService.findProduct(id);
        res.render("./product/product_details", { productDetails });
    } else {
        res.render("./error");
    }
};




// --------------------------------------------------------------------------------------------------------------

/**
 * Find list of products with condition in req .body.
 *
 * @param {*} req.body : //search_with// is filter type, //value// is the value for product service to search, //page// is for pagination
 * @param {*} res
 */
exports.findProductWithCondition = async(req, res) => {
    const searchCond = req.body.search_with;
    const value = req.body.value;
    console.log(
        " client want to seach with condition: " + searchCond + " value: " + value
    );
    switch (searchCond) {
        case "name":
            {
                const nameCond = value;
                const listOfProduct = await productService.findByName(nameCond);
                if (listOfProduct.length != 0) {
                    res.render("./product/product_table", { listOfProduct });
                } else {
                    res.render("error");
                    console.error("cant find product with name");
                }
                break;
            }
    }
};

// --------------------------------------------------------------------------------------------------------------

/**
 * Edit product have matching id with items in data base
 *
 * @param {*} req
 * @param {*} res
 * return false if there no items in data base to edit
 */
exports.editProductWithPostValue = async function(req, res) {
    const id = parseInt(req.body.product_id);
    const name = req.body.name;
    const grade = req.body.eGrade;
    const universe = req.body.universe;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const link_picture = req.body.link;

    if (isNaN(id)) {
        res.end("failed. Try to edit imaginary product");
    } else {
        const findProduct = await productService.findProduct(id);
        if (findProduct === null) {
            res.end("failed. Try to edit imaginary product");
        } else {
            product = await productService.updateProduct(
                id,
                name,
                grade,
                universe,
                description,
                price,
                link_picture
            );
            res.end("success");
        }
    }
};

//---------------------------------------------------------------------------------------------------------------

// We use multer to read those Files

// define where to save file





/**
 *add product with value in req body and link to the picture files
 *
 * @param {*} req
 * @param {*} res
 */
exports.addProductTextInfo = async function(req, res) {
    const id = parseInt(req.body.product_id);
    const name = req.body.name;
    const GundamGrade = req.body.grade;
    const universe = req.body.universe;
    const description = req.body.description;
    const price = parseFloat(req.body.price);
    const link_picture = (saveDefaultPath + req.body.name + "/" + req.file.filename);



    if (!isNaN(id) && !isNaN(price)) {
        /** add product return two object, created indicate that if product is created or not */
        const [product, created] = await productService.addProduct(
            id,
            name,
            GundamGrade,
            universe,
            description,
            price,
            link_picture,
        );
        if (!created) {
            res.end(
                "fails: there already exists a product with the same id = " +
                id +
                " with name = " +
                name
            );
        } else {
            res.end("success");
        }
    } else {
        res.end("fails: please insert number to id and price");
    }
};

// --------------------------------------------------------------------------------------------------------------