const { __ } = require("i18n");
const { body, validationResult } = require('express-validator');
const appRoot = require("app-root-path");
const dbUsers = appRoot.require('/db/handlers/dbUsers')
var bcryptjs = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');


async function showLoginForm(req, res, next)
{
    res.render("login", {title: __("loginPageTitle")});
}
async function addFcmToken(req,res,next){
    let u = await dbUsers.getUserByToken(req.body.tok);
    if(u){
        u.fcm_token = req.body.fcm_token;
        let b = await dbUsers.updateUser(u);
        return res.status(200);

    }
    
}


async function showHomePage(req, res, next)
{
   if(req.session.user){
    res.render("home", {title: __("homepageTitle"), first_name: req.session.user.first_name});
   }
   res.redirect("login");
}

async function logout(req, res, next)
{
    req.session.user = null;
    res.redirect("login");

}
let loginValidation = 
[
    body("email").notEmpty().withMessage(__("fieldIsRequired")).isEmail(),
    body("password").notEmpty().withMessage(__("fieldIsRequired")).isLength({min:8})
]

async function processLoginRequest(req, res, next)
{
    let errors = validationResult(req);
    if (errors.isEmpty())
    {



        let u = await dbUsers.getUserById(req.body.email);
        if(u){

            let samePass = await bcryptjs.compare(req.body.password, u.password)
            if(samePass){
                req.session.user = u;
                u.last_login = new Date();
                u.fcm_token = req.body.fcm_token;
                await dbUsers.updateUser(u);
                if(req.API){
                    let tok = uuidv4();
                    u.token=tok;
                    await dbUsers.updateUser(u);
                    

                    
                    return res.status(200).json({works:true,token:tok});
                }
                return res.redirect("/home");
            }
        }
        

    }


    errors= {errors:[{msg:__("login_failed")}]};
    if(req.API){
        return res.status(200).json({works:false});
    }

    
    res.render("login", {title: __("loginPageTitle"), errors:errors.errors});
}

module.exports = {addFcmToken, logout, showLoginForm, processLoginRequest, loginValidation, showHomePage}