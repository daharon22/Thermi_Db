var express = require('express');
const appRoot = require("app-root-path");
var router = express.Router();
const signup = appRoot.require("/controllers/signup");


router.get('/', signup.showLoginForm);
router.post('/', signup.signupValidation, signup.processSignupRequest);

module.exports = router;