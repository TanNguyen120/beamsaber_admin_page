const { models } = require("../../models");
const { Op } = require("sequelize");


exports.findUsersWithName = (nameCondition,page = 0,items=12) => {
    return models.user.findAll({
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


exports.findProductWithName = (nameCondition) => {
    return models.product.findAll({
        where: {
            name: {
                [Op.substring]: nameCondition,
            },
        },
        raw: true,
    });
};

