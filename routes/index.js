var express = require('express');
var router = express.Router();
const {home, contact} = require('../controllers/index_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/home', home);
router.get('/contact', contact)


module.exports = {
  routes: router
}
