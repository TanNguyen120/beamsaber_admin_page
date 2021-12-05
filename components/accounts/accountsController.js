const accountsService = require("./accountsService");

//---------------------------------------------------------------------------------------------------------------

/**
 * find all user and pagination
 *
 */
exports.accountsTable = async function (req, res, next) {

    const page = !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) - 1 : 0;
    const pagePass = page == 0 ? 1 : page + 1;

    console.log("client want find accounts in page: " + page);

    const listOfAccounts = await accountsService.findAllAccounts(page, 12);
    res.render("./accounts/accounts_table", { listOfAccounts, pagePass });
};

//---------------------------------------------------------------------------------------------------------------

exports.adminTable = async (req, res) => {

    const page = !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) - 1 : 0;
    const pagePass = page == 0 ? 1 : page + 1;

    console.log("listing all admin !!");
    try {
        const listOfAccounts = await accountsService.findAllAdmin(page, 12);
        res.render("./accounts/accounts_table", { listOfAccounts, pagePass });
    } catch (err) {
        console.log("ERR while querying: " + err.message);
        res.render("err", { message: err.message });
        throw err;
    }
}
//---------------------------------------------------------------------------------------------------------------

exports.userTable = async (req, res) => {

    const page = !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) - 1 : 0;
    const pagePass = page == 0 ? 1 : page + 1;

    console.log("listing all user !!");
    try {
        const listOfAccounts = await accountsService.findAllUser(page, 12);
        res.render("./accounts/accounts_table", { listOfAccounts, pagePass });
    } catch (err) {
        console.log("ERR while querying: " + err.message);
        res.render("err", { message: err.message });
        throw err;
    }
}