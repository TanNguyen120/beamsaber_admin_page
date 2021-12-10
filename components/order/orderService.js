const { models } = require("../../models");
const { Op } = require("sequelize");




// ---------------------------------------------------------------------------------------------------------------------------------------------
exports.findAllOrders = function (page = 0, items = 12) {
    return models.order.findAll({
        offset: page * items,
        limit: items,
        raw: true
    });
};