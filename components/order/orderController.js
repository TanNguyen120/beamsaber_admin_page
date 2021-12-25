const orderService = require("./orderService");


//------------------------------------------------------------------------------
exports.ordersTable = async (req, res) => {
    const page = !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) : 1;
    const pagePass = page == 0 ? 1 : page;
    try {
        const listOfOrder = await orderService.findAllOrders(page - 1);
        res.render("./orders/index", { listOfOrder, page });
    } catch (err) {
        console.log(err.message);
        res.render("error", { message: "cant find list of orders" })
        throw err;
    }
}

// -------------------------------------------------------------------------------
exports.editStatus = (req, res) => {
    const orderId = req.body.order_id;
    const chageStatus = req.body.status;
    try {
        const edit = orderService.changeStatus(orderId, chageStatus);
        res.send("success")
    }
    catch (err) {
        console.error(err);
        res.send("failed: " + err.message);
        throw err;
    }
}