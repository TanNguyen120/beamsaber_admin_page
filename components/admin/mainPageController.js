const pageService = require('./mainPageService');



// show some info about total earn , top sell kit ....
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

        // select distinct years in data base
        const years = await pageService.findYears();
        const distinctYears = await pageService.distinctYears(years);


        res.render('./index', { productsNumber, numberOfOrder, totalEarn, topSellProductInfo, distinctYears });
    } catch (err) {
        res.send("some thing went wrong");
        throw err;
    }

}

