const productService = require("./productService");







exports.productTable = async function (req,res) {
    const page = parseInt(req.query.page);

    console.log(" client want find items in page: " +page);

    if(!isNaN(page) && page >0 ) {
        const listOfProduct = await  productService.listProductTable(page,12);
        res.render("./product/ product_table", {listOfProduct, page});
    }
    else {
        const listOfProduct = await productService.listProductTable();
        
        res.render("./product/product_table", {listOfProduct, page});
    }
};


exports.postProductTable = async function (req,res) {
    const page = parseInt(req.body.page);
    console.log(" client want find items in page: " +page);
    if(isNaN(page) && page >0 ) {
        const listOfProduct = await  productService.listProductTable(page,12);
        res.render("./product/product_table", {listOfProduct, page});
    }
    else {
        const listOfProduct = await productService.listProductTable();
        res.render("./product/product_table", {listOfProduct, page});
    }
};



exports.deleteProductWithID = async function (req,res) {
    const id = req.body.id;
    console.log("id is: " + id);
    if(!isNaN(id))
    {
        await productService.deleteProduct(id);
        res.end("success");
    }
    else{
        res.end("fail");
        throw new Error("id is not valid");
    }
};

exports.findProductById = async function (req,res) {
    const id = req.body.product_id;
    console.log("id is " + id);
    if(!isNaN(id))
    {
        const productDetails=await productService.findProduct(id);
        res.render("./product/product_details",{productDetails});
    }
    else{
        res.render("./error");
    }
}