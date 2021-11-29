const { models } = require("../../models");
const { Op } = require("sequelize");

// --------------------------------------------------------------------------------------------------------------
exports.listProductTable = function(page = 0, items = 12) {
    return models.product.findAll({
        offset: page * items,
        limit: items,
        raw: true
    });
};


exports.findByName = (nameCondition,page = 0,items=12) => {
    return models.product.findAll({
        where: {
            name: {
                [Op.substring]: nameCondition
            },
        },
        raw: true,
        offset: page * items,
        limit: items
    });
};