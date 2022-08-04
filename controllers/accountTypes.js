const {AccountTypes} = require("../models");

const getAccountTypes = async () => {
    console.log("this is the value")
    let results = await AccountTypes.findAll({raw: true});
    console.log(results);
    //res.render('account_types', {accountTypes: results});
    //res.send("Tipos de cuentas")
}

module.exports = {
    getAccountTypes
}