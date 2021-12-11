const { models } = require("../../models");
const { Op } = require("sequelize");



exports.updateAccount = (
    userId,
    userName,
    userEmail,
    userPassword,
    userAddress,
    userPhone,
    userBankAccount,
    userRole,
    userStatus
) => {
    models.user.update({
        name: userName,
        email: userEmail,
        password: userPassword,
        address: userAddress,
        phone: userPhone,
        bank_account: userBankAccount,
        role: userRole,
        account_status: userStatus
    }, { where: { user_id: userId } });
};



//-------------------------------------------------------------------------------------------------------------------------------

exports.removeAccount = (accountId) => {
    console.log("Removing account: " + accountId); 1
    models.user.destroy({
        where: { user_id: accountId },
    })
}


exports.findUser = (userId) => {
    return models.user.findByPk(userId, { raw: true });
}

exports.updateUser = (userId, userPhone, userAddress, userBankAccount) => {
    return models.user.update(
        {
            phone: userPhone, address: userAddress,
            bank_account: userBankAccount
        },
        { where: { user_id: userId } });
}