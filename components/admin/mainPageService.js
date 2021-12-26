const { models } = require("../../models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

exports.countProduct = () => {
    return models.product.count();
}

exports.countOrder = () => {
    return models.order.findAndCountAll({
        raw: true
    });
}

//------------------------------------------------------------------------------------------------------------
exports.getProductsCount = () => {
    // SQL :   SELECT "product_id", count("product_id") AS "count" FROM "cart_items" GROUP BY "cart_items"."itemId" ORDER BY count DESC;
    return models.cart_items.findAll({
        attributes: ['product_id', [sequelize.fn('count', sequelize.col('product_id')), 'count']],
        group: ['cart_items.product_id'],
        raw: true,
        order: sequelize.literal('count DESC'),
        offset: 0,
        limit: 5
    });
}

exports.findProduct = (productId) => {
    return models.product.findByPk(productId,
        {
            attributes: ['name', 'link_picture'],
            raw: true
        }
    )
}

//--------------------------------------------------------------------------------------------------------------
// calculate the sum of total cost in list of order
exports.calculateTotalEarn = (orders) => {
    const numberOfOrder = orders.count;
    let totalEarn = 0;

    // loop through the rows of order to sum all total_cost
    for (let i = 0; i < numberOfOrder; i++) {
        totalEarn += orders.rows[i].total_cost;
    }
    // round the number to 2 decimal
    totalEarn = totalEarn.toFixed(2);
    return totalEarn;
}


// find the details of product from topSellProduct
exports.topSellProductInfo = async (topSellProduct) => {
    let topSellProductInfo = new Array;

    for (let i = 0; i < topSellProduct.length; i++) {
        const productInfo = await module.exports.findProduct(topSellProduct[i].product_id);
        // create a new object that have product name link picture and sell count
        const productInfoCount =
        {
            name: productInfo.name,
            pic: productInfo.link_picture,
            sellCount: topSellProduct[i].count
        };
        topSellProductInfo.push(productInfoCount);
    }
    return topSellProductInfo;
}