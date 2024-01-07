const { __ } = require("i18n");
const { body, validationResult } = require('express-validator');
const appRoot = require("app-root-path");
const dbUsers = appRoot.require('/db/handlers/dbUsers')
const { v4: uuidv4 } = require('uuid');


async function showSignupForm(req, res, next)
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
        let x = 5;
        let q = await dbUsers.getUserById(req.body.Email);
        if (q==null){
            let u = await dbUsers.addUser({
                first_name: req.body.First_Name, 
                last_name: req.body.Last_Name, 
                email: req.body.Email,
                userid: req.body.Email,
                password: req.body.Password})
            if(req.API)
            {
                let thisUser = await dbUsers.getUserById(req.body.Email);
                let tok = uuidv4();
                thisUser.token=tok;
                await dbUsers.updateUser(u);
                res.status(200).json({works:"true", token:tok});
            }
            else{
                res.redirect("/welcome");

            }
            

        }
        else{
            if(req.API)
            {
                res.status(200).json({works:"email in use"});
            }
            else{
                errors= {errors:[{msg:__("signup_failed")}]};
                res.render("signup", {title: __("signupPageTitle"), errors:errors.errors});

            }
            
        }
        
        

    }
    else
    {
        if(req.API)
        {
            res.status(200).json({works:"Error in form"});
        }
        else{
            res.render("signup", {title: __("signupPageTitle"), errors:errors.errors});

        }
        
    }
}

module.exports = {showSignupForm, signupValidation, processSignupRequest, showWelcomePage}