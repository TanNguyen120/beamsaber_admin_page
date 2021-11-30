const searchService = require("./searchService");







/**
 * Function handle search request of client
 *
 * @param {*} req have some value like search condition and value 
 * @param {*} res render the result
 */
exports.searchWithCondition = async function(req, res) {

    // Prepare variable for model to query
    const page = !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) : 1;
    const pagePass = page == 0 ? 1 : page;
    const searchCondition = req.query.search_with;
    const value = req.query.value;
    console.log("QUERY STRING: " + page + " " + searchCondition + " " + value);
    const filterCondition = "?search_with="+searchCondition+"&value="+value;

    // use switch case to search with given query string 
    switch (searchCondition) {
        case "user_name":{
            console.log("search name have substring: " + value); 
            const listOfAccounts = await searchService.findUsersWithName(value,page-1);
            if(listOfAccounts.length == 0)
            {
                res.status(500).end("Bad Request: There no user name in data base have that substring")
                
            }
            else {
               
                res.render("./accounts/accounts_table_filter",{listOfAccounts,pagePass,filterCondition})
            }
            break;
        }
        case "product_name":{
            console.log("search name have substring: " + value); 
            const listOfProduct = await searchService.findProductWithName(value,page-1);
            if(listOfProduct.length == 0)
            {
                res.status(500).end("Bad Request: There no product name in data base have that substring")
                
            }
            else {
                res.render("product/product_table_filter",{listOfProduct,pagePass,filterCondition})
            }
            break;
        }
    }
}