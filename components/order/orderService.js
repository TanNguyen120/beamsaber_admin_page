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

exports.findAllUserDetail = (page = 0, items = 12) => {
    return models.order.findAll({
        include: { model: models.user, as: "user" },
        offset: page * items,
        limit: items,
        raw: true
    })
}

exports.changeStatus = (orderId, orderStatus) => {
    return models.order.update({
        status: orderStatus
    }, {
        where: {
            order_id: orderId
        }
    })
}