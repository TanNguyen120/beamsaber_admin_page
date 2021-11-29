const productsService = require('./productsService');

/**
 * find all item and pageination
 *
 */
 exports.productTable = async function(req, res,next) {
    
    const page = parseInt(req.query.page);

    console.log(" client want find items in page: " + page);

    if (!isNaN(page) && page > 0) {
        const listOfProduct = await productsService.listProductTable(page - 1, 12);
        res.render("./product/product_table", { listOfProduct, page });
    } else {
        const listOfProduct = await productsService.listProductTable();

        res.render("./product/product_table", { listOfProduct, page: 1 });
    }
    next();
};




//-------------------------------------------------------------------------------------------------------------------------------

exports.searchWithCondition = async function(req, res) {
    const page = !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) : 1;
    const pagePass = page == 0 ? 1 : page;
    const searchCondition = req.query.search_with;
    const value = req.query.value;

    console.log("QUERY STRING: " + page + " " + searchCondition + " " + value);

    switch (searchCondition) {
        case "name":{
            console.log("search name have substring: " + value); 
            const listOfProduct = await productsService.findByName(value,page-1);
            if(listOfProduct.length == 0)
            {
                res.status(500).end("Bad Request: There no name in data base have that substring")
                
            }
            else {
                const filterCondition = "?search_with=name"  + "&value=" + value;   ;
                res.render("product/product_table_filter",{listOfProduct,pagePass,filterCondition})
            }
            break;
        }
    }
}