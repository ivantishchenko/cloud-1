var express = require('express');
var router = express.Router();
var eventService = require('../services/event-service');
var googleService = require('../google/connect');
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
      vm = {};
      return res.send(vm);
    }

    googleService.listAll(function(data) {
      for ( var i = 0; i < data.length; i++ ) {
        var obj = {
          name: data[i].summary,
          place: data[i].location,
          priority: data[i].description
        };
        vm.push(obj);
      }
      res.send(vm);

    });
    
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
    res.send({msg: "hi"});
  });
});

// Submission route POST
router.post('/create', function(req, res, next) {
  // grabing the contenct from the POST req
  eventService.addEvent(req.body, function(event, err){
    //console.log(req.body);
    if (err) {
      return res.send(null);
    }
    //console.log(event);
    googleService.addGoogle(event);
    res.send(event);
  });
});

module.exports = router;
