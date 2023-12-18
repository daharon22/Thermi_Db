var express = require('express');
const appRoot = require("app-root-path");
var router = express.Router();
const login = appRoot.require("/controllers/login");




router.get('/', login.showLoginForm);
router.post('/', login.loginValidation, login.processLoginRequest);

module.exports = router;