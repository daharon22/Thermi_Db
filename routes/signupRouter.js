var express = require('express');
const appRoot = require("app-root-path");
var router = express.Router();
const signup = appRoot.require("/controllers/signup");


router.get('/', signup.showSignupForm);
router.post('/', signup.signupValidation, signup.processSignupRequest);

module.exports = router;