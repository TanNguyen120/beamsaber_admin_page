const pageService = require('./mainPageService');

exports.showInfo = async (req, res) => {
    try {
        // count total number of product
        const productsNumber = await pageService.countProduct();

        // find and count all order
        const order = await pageService.countOrder();
        const numberOfOrder = order.count;
        let totalEarn = 0;

        // loop through the rows of order to sum all total_cost
        for (let i = 0; i < numberOfOrder; i++) {
            totalEarn += order.rows[i].total_cost;
        }
        // round the number to 2 decimal
        totalEarn = totalEarn.toFixed(2);

        res.render('./index', { productsNumber, numberOfOrder, totalEarn });
    } catch (err) {
        res.send("some thing went wrong");
        throw err;
    }

}