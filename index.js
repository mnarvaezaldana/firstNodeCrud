const dotenv = require('dotenv').config();
const express = require('express');
const { getAccountTypes } = require('./controllers/accountTypes');
const {AccountTypes, clients, accounts} = require('./models')

const app = express();
//CRUD -> CREATE, READ, UPDATE y DELETE

app.set('view engine', 'ejs')

//Para poder leer los datos que envía le cliente con el formato URL Encoded
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
    console.log("hola mundo")
    res.send("Servidor Academlo")
})

//READ
app.get("/account_types", async (req, res) => {
    getAccountTypes();
})

//ANOTHER READ
//app.get("/clients", async (req, res) => {
//    let results = await clients.findAll({include: ["accounts"], raw: true, nested: true});
//    console.log(results)
//    res.render('clients')
//});

app.get("/accounts", async (req, res) => {
    let results = await accounts.findAll({includes: [{model: clients}], raw: true, nest: true});
    console.log(results)
    res.render('clients')
});

app.get("/clients", async (req, res) => {
    let results = await clients.findAll({include: [{model: accounts}]});
    console.log(JSON.stringify(results.map( client => client.get({plain: true}))))
});

//get the account_types and the accounts related to it
app.get("/account_types_test", async (req, res) => {
    let results = await AccountTypes.findAll({raw: true, nest: true, include: [{model: accounts}]});
    console.log(results)
    res.render('account_types', {accountTypes: results})
});

app.get("/accounts", async (req, res) => {
    let results = await accounts.findAll({raw: true, nest: true, include: [{model: AccountTypes}]});
    console.log(results)
    res.render('accounts', {accounts: results});
});

app.get("/account_with_account_type", async (req, res) => {
    let results = await accounts.findAll({include: [{model: AccountTypes}, {model: clients}]});
    console.log(JSON.stringify(results))
    res.send(JSON.stringify(results))
});

app.get("/accounts_with_clients", async (req, res) => {
    let results = await accounts.findAll({raw: true, nest: true, include: [{model: AccountTypes}, {model: clients}]});
    console.log(results)
    res.render('accounts_with_clients', {accounts: results});
});

app.get("/account_types_and_accounts", async (req, res) => {
    let account_types = await AccountTypes.findAll({include: [{model: accounts}]});
    console.log(JSON.stringify(account_types.map( account => account.get({plain: true}))))
    res.render('clients')
})

//CREATE
app.post("/account_types", async (req, res) => {
    const {name, description} = req.body
    try {
        let results = await AccountTypes.create({name, description})
        res.send("Se ha agregado un tipo de cuenta");
    } catch (error) {
        console.log(error)
    }
});

const PORT = process.env.PORT || 8080;

console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

app.listen(PORT, () => {
    console.log("Servidor escuchando sobre el puerto", PORT)
});