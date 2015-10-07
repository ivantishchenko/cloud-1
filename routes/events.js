var express = require('express');
var router = express.Router();
var eventService = require('../services/event-service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var vm = {
    title: 'Your events'
  };
  res.render('events/index', vm);
});
// GET /users/view
router.get('/create', function(req, res, next) {
  res.render('events/create');
});
// Submission route POST
router.post('/create', function(req, res, next) {
  // grabing the contenct from the POST req
  eventService.addEvent(req.body, function(err){
    //console.log(req.body);
    if (err) {
      var vm = {
        input: req.body,
        error: 'Something went wrong creating an event'
      };
      return res.render('events/create', vm);
    }
    res.redirect('/events');
  });
});

module.exports = router;
