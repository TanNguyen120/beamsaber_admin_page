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
    userRole
) => {
    models.user.update({
        name: userName,
        email: userEmail,
        password: userPassword,
        address: userAddress,
        phone: userPhone,
        bank_account:userBankAccount,
        role: userRole
    }, { where: { user_id: userId } });
};



//-------------------------------------------------------------------------------------------------------------------------------

exports.removeAccount =(accountId)=>{
    console.log("Removing account: " + accountId);
    models.user.destroy({
        where: { user_id: accountId },
    })
}