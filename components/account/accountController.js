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

    console.log("client edit: " + user_id + " " + name + " " + email + " " + password + " " + phone + " " + bank_account + " " + role + " " + address);
    if(isNaN(user_id)){
        res.status(400).send("bad request: id is not a number");
    }
    else
    {
        accountService.updateAccount(user_id,name,email,password,address,phone,bank_account,role);
        res.send("success")
    }

}

exports.removeAccount = async (req,res)=>{
    const user_id = parseInt(req.params.id);
    console.log("client want delete account with id: " + user_id);
    if(isNaN(user_id)){
        res.status(400).send({message: "bad request: user_id is not a number"})
    }
    else{
        accountService.removeAccount(user_id);
        res.status(202).send("request account has been successfully removed");
    }

}