const { models } = require("../../models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");


// find all the years in database
exports.findYears = () => {
    return models.order.findAll({
        attributes: [[sequelize.fn('YEAR', sequelize.col('DATE')), 'YEAR']],
        raw: true
    });
}


// find distinct years from list of years
exports.distinctYears = (years) => {
    const distinctYears = new Array;
    for (let index = 0; index < years.length; index++) {
        const element = years[index].YEAR;
        if (distinctYears.indexOf(element) === -1) {
            distinctYears.push(element);
        }
    }
    return distinctYears;
}

exports.countOrderInYear = (year) => {
    return models.order.findAndCountAll({
        where: sequelize.where(sequelize.fn('YEAR', sequelize.col('DATE')), year),
        raw: true
    });
}

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

