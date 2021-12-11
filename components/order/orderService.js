const { models } = require("../../models");
const { Op } = require("sequelize");




// ---------------------------------------------------------------------------------------------------------------------------------------------
exports.findAllOrders = function (page = 0, items = 12) {
    return models.order.findAll({
        include: { model: models.cart_items, as: "cart_items" },
        offset: page * items,
        limit: items,
        raw: true
    });
};