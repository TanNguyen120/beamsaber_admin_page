const { models } = require("../../models");

exports.listProductTable = function (page = 0, items = 12) {
  return models.product.findAll({
    offset: page * items,
    limit: items,
    raw: true,
  });
};


exports.deleteProduct = function (pId){
    return models.product.destroy({
        where: {
            product_id: pId
        },
        raw: true
    });
};



exports.findProduct = function (pId){
    return models.product.findByPk(pId, {raw: true});
}


