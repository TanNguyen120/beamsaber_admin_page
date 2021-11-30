const accountsService = require("./accountsService");

//---------------------------------------------------------------------------------------------------------------

/**
 * find all user and pagination
 *
 */
 exports.accountsTable = async function(req, res,next) {
    
    const page = !isNaN(parseInt(req.query.page))? parseInt(req.query.page)-1: 0 ;
    const pagePass = page == 0? 1 : page + 1;

    console.log("client want find accounts in page: " + page);

    const listOfAccounts = await accountsService.findAllAccounts(page, 12);
    res.render("./accounts/accounts_table", { listOfAccounts, pagePass });
};

//---------------------------------------------------------------------------------------------------------------

