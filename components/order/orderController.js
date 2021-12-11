const orderService = require("./orderService");


//------------------------------------------------------------------------------
exports.ordersTable = async (req, res) => {
    const page = !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) : 1;
    const pagePass = page == 0 ? 1 : page;
    try {
        const listOfOrder = await orderService.findAllOrders(page - 1);
        console.log(JSON.stringify(listOfOrder));
        res.render("./orders/index", { listOfOrder, page })
    } catch (err) {
        console.log(err.message);
        res.render("error", { message: "cant find list of orders" })
        throw err;
    }


}