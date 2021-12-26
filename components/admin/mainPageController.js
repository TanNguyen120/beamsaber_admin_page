const pageService = require('./mainPageService');

exports.showInfo = async (req, res) => {
    try {
        // count total number of product
        const productsNumber = await pageService.countProduct();

        // find and count all order
        const orders = await pageService.countOrder();

        const numberOfOrder = orders.count;

        const topSellProduct = await pageService.getProductsCount();

        const totalEarn = pageService.calculateTotalEarn(orders);

        const topSellProductInfo = await pageService.topSellProductInfo(topSellProduct);


        res.render('./index', { productsNumber, numberOfOrder, totalEarn, topSellProductInfo });
    } catch (err) {
        res.send("some thing went wrong");
        throw err;
    }

}