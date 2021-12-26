const { models } = require("../../models");
const { Op } = require("sequelize");

exports.countProduct = () => {
    return models.product.count();
}

exports.countOrder = () => {
    return models.order.findAndCountAll({
        raw: true
    });
}

