const user = require('../../models/user');
const accountService = require('./accountService')

//---------------------------------------------------------------------------------------------------------------------------------

exports.editAccount = async (req, res) => {
    const user_id = parseInt(req.body.user_id);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const bank_account = req.body.bank_account;
    const role = req.body.role;
    const address = req.body.address;
    const status = req.body.status;

    console.log("client edit: " + user_id + " " + name + " " + email + " " + password + " " + phone + " " + bank_account + " " + role + " " + address);
    if (isNaN(user_id)) {
        res.status(400).send("bad request: id is not a number");
    }
    else {
        accountService.updateAccount(user_id, name, email, password, address, phone, bank_account, role, status);
        res.send("success")
    }

}

exports.removeAccount = async (req, res) => {
    const user_id = parseInt(req.params.id);
    console.log("client want delete account with id: " + user_id);
    if (isNaN(user_id)) {
        res.status(400).render("error", { message: "bad request: user_id is not a number" })
    }

    if (user_id === parseInt(req.user.user_id)) {

        res.send("SUICIDE IS BAD. DONT DO IT. /n You are trying to delete your own account");

    }
    else {
        accountService.removeAccount(user_id);
        res.status(202).send("request account has been successfully removed");
    }

}


exports.userProfile = async (req, res) => {
    if (!req.user) {
        res.status(404).render("error", { message: "you are not an authorize user" })
    }
    else {
        try {
            const userProfile = await accountService.findUser(req.user.user_id);
            res.render("./user_profile/profile", { userProfile });
        }
        catch (err) {
            res.render("error", { error: err });
            console.log("ERR while querying: " + err)
            throw err;
        }
    }
}

exports.updateProfile = async (req, res) => {
    const phoneNumber = req.body.phone;
    const address = req.body.address;
    const bankAccount = req.body.bankAccount;
    const id = req.user.user_id
    console.log('updating: ' + id + ' to ' + phoneNumber + ' ' + address + ' ' + bankAccount);
    try {
        const userprofile = await accountService.updateUser(id, phoneNumber, address, bankAccount);
        res.redirect('/');
        console.log('success update');
    } catch (err) {
        res.render('error', { message: "cant update your account" })
        console.log('error at update profile: ' + err.message);
        throw err;
    }
}