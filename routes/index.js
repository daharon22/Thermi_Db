var express = require('express');
var router = express.Router();
const appRoot = require("app-root-path");
const signupController = appRoot.require("/controllers/signup");
const loginController = appRoot.require("/controllers/login");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/logout", loginController.logout);

router.get("/welcome", signupController.showWelcomePage);

router.get("/home", loginController.showHomePage);

module.exports = router;
