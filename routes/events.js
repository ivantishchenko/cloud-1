var express = require('express');
var router = express.Router();
var eventService = require('../services/event-service');

// GET /create VIEW
/*
router.get('/create', function(req, res, next) {
  res.render('events/create');
});*/

// SEARCHING based on place
router.get('/search', function(req, res, next) {

  eventService.paramSearch(req.query['place'], function(err, data) {
    if ( err ) {
      data = { error: 'Unable to find an event'};
      return res.render('events/', data);
    }
    res.send(data);
  });
});

/* GET events listing. */
router.get('/', function(req, res, next) {
  eventService.showEvents(function(err, vm) {
    if (err) {
      vm = { error: 'Something went wrong selecting events'};
      return res.render('events/', vm);
    }
    //res.render({vm: vm});
    res.send(vm);
  });
});

// GET One event

router.get('/:id', function(req, res, next) {
  eventService.showOne({_id: req.params.id}, function(err, event) {
    if (err || event == null ) {
      event = { error: 'An element with this ID doesn\'t exist' };
      return res.render('events/', event);
    }
    res.send(event);
  });
});

// Updata one event PUT
router.put('/:id', function(req, res, next){
  eventService.updateEvent({_id: req.params.id}, req.body, function(err) {
    if(err) {
      var vm = { error: 'An element with this ID doesn\'t exist' };
      return res.render('events/', vm);
    }
    res.send({msg: 'Event updated'});
  });
});

router.delete('/:id', function(req, res, next) {
  eventService.deleteEvent({_id: req.params.id}, function(err) {
    if(err) {
      var vm = { error: 'An element with this ID doesn\'t exist' };
      return res.render('events/', vm);
    }
    res.send({msg: 'Event deleted'});
  });
});

router.delete('/', function(req, res, next) {
  eventService.deleteAll(function(err) {
    if(err) {
      var vm = { error: 'Error deleting the records' };
      return res.render('events/', vm);
    }
    res.send({msg: 'All events deleted'});
  });
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
