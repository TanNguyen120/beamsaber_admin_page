const { models } = require("../../models");
const { Op } = require("sequelize");

//------------------------------------------------------------------------------------------------------------------------------------------------
exports.findAllAccounts = (page = 0, items = 12) => {
    return models.user.findAll({
        offset: page * items,
        limit: items,
        raw: true
    });
}


//-------------------------------------------------------------------------------------------------------------------------------------------------
exports.findAllAdmin = (page = 0, items = 12) => {
    return models.user.findAll({
        where: { role: 'admin' }
    }, {
        offset: page * items,
        limit: items,
        raw: true
    });
}

//-------------------------------------------------------------------------------------------------------------------------------------------------
exports.findAllUser = (page = 0, items = 12) => {
    return models.user.findAll({
        where: { role: 'user' }
    }, {
        offset: page * items,
        limit: items,
        raw: true
    });
}

