const reportsService = require("./reportService");

// return all years that have an order in the data base
exports.getYears = async (req, res) => {
    try {
        const years = await reportsService.findYears();
        const distinctYears = await reportsService.distinctYears(years);
        res.send(JSON.stringify(distinctYears));

    } catch (err) {
        console.error(err);
        throw err;
    }

}

// report some information in the given years

exports.report = async (req, res) => {
    const year = req.params.year
    if (year) {
        try {
            const orders = await reportsService.countOrderInYear(year);
            const numberOfOrder = orders.count;
            const totalEarn = await reportsService.calculateTotalEarn(orders);
            res.render('./reports', { numberOfOrder, totalEarn, year });
        } catch (err) {
            console.error(err);
        }
    }

}