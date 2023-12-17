var express = require('express');
var router = express.Router();
const appRoot = require("app-root-path");
const signupController = appRoot.require("/controllers/signup");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/welcome", signupController.showWelcomePage);

module.exports = router;
