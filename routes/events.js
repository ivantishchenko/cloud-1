var express = require('express');
var router = express.Router();
//var userService = require('../services/event-service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// GET /users/view
router.get('/create', function(req, res, next) {
  res.render('events/create');
});

module.exports = router;
