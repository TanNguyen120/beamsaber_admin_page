const { models } = require("../../models");
const { Op } = require("sequelize");




// --------------------------------------------------------------------------------------------------------------

exports.deleteProduct = function(pId) {
    return models.product.destroy({
        where: {
            product_id: pId,
        },
        raw: true,
    });
};

// --------------------------------------------------------------------------------------------------------------

exports.findProduct = function(pId) {
    return models.product.findByPk(pId, { raw: true });
};

// --------------------------------------------------------------------------------------------------------------

/**
 * find product with matching id if found return created = false
 * if this is new product create it and return created = true
 * @return {*} 2 object the models and created
 */
exports.addProduct = function(
    pId,
    pName,
    pGrade,
    pUniverse,
    pDescription,
    pPrice,
    pPictureLink
) {
    console.log(
        "*********************************** addProduct: ",
        pId,
        pName,
        pGrade,
        pUniverse,
        pPrice,
        pPictureLink
    );
    return models.product.findOrCreate({
        where: {
            product_id: pId,
        },
        defaults: {
            name: pName,
            grade: pGrade,
            universe: pUniverse,
            description: pDescription,
            price: pPrice,
            link_picture: pPictureLink,
        },
    });
};

// --------------------------------------------------------------------------------------------------------------

exports.findByName = (namecond) => {
    return models.product.findAll({
        where: {
            name: {
                [Op.substring]: namecond,
            },
        },
        raw: true,
    });
};

// --------------------------------------------------------------------------------------------------------------

exports.updateProduct = (
    pId,
    pName,
    nGrade,
    pUniverse,
    pDescription,
    pPrice,
    pPictureLink
) => {
    models.product.update({
        name: pName,
        grade: nGrade,
        price: pPrice,
        universe: pUniverse,
        description: pDescription,
        link_picture: pPictureLink,
    }, { where: { product_id: pId } });
};