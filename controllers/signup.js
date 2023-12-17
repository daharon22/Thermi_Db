const { __ } = require("i18n");
const { body, validationResult } = require('express-validator');
const appRoot = require("app-root-path");
const dbUsers = appRoot.require('/db/handlers/dbUsers')


async function showLoginForm(req, res, next)
{
    res.render("signup", {title: __("signupPageTitle")});
}

async function showWelcomePage(req, res, next)
{
    res.render("welcome", {title: __("welcomeTitle")});
}

let signupValidation = 
[
    body("First_Name").notEmpty().withMessage(__("fieldIsRequired")), 
    body("Last_Name").notEmpty().withMessage(__("fieldIsRequired")),
    body("Email").notEmpty().withMessage(__("fieldIsRequired")).isEmail(),
    body("Password").notEmpty().withMessage(__("fieldIsRequired")).isLength({min:8})
]
async function processSignupRequest(req, res, next)
{
    let errors = validationResult(req);
    if (errors.isEmpty())
    {
        
        let u = await dbUsers.addUser({
            first_name: req.body.First_Name, 
            last_name: req.body.Last_Name, 
            email: req.body.Email,
            userid: req.body.Email,
            password: req.body.Password})
        res.redirect("/welcome");

    }
    else
    {
        res.render("signup", {title: __("signupPageTitle"), errors:errors.errors});
    }
}

module.exports = {showLoginForm, signupValidation, processSignupRequest, showWelcomePage}