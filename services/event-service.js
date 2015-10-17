// load Event class
var Event = require('../models/event').Event;

exports.addEvent = function(event, next) {
  var newEvent = new Event({
    name: event.name,
    place: event.place,
    priority: event.priority,
    with: event.with
  });
  // inserting into MONGO with a callback
  newEvent.save(function(err) {
    if (err) {
      return next(err);
    }
    // no error
    next(null);
  });
};

exports.showEvents = function(next) {
  Event.find({}, function(err, data) {
    if ( err ) return next(err);
    else next(null, data);
  });
};

exports.showOne = function(id, next) {
  Event.findById(id, function(err, data) {
    if ( err ) return next(err);
    next(null, data);
  });
};

exports.updateEvent = function(id, event, next) {
  Event.findById(id, function(err, data) {
    if ( err ) return next(err);
    data.name = event.name;
    data.place = event.place;
    data.priority = event.priority;
    data.with = event.with;
    data.save();
    next(null);
  });
};

exports.deleteEvent = function(id, next) {
  Event.remove(id, function(err) {
    if(err) return next(err);
    next(null);
  });
};

exports.deleteAll = function(next) {
  Event.remove(function(err) {
    if(err) return next(err);
    next(null);
  });
};

exports.paramSearch = function(param, next) {
  var pattern = {
    place:  {$regex: new RegExp("^" + param.toLowerCase(), "i")}
  };
  Event.find(pattern, function(err, data) {
    if(err) return next(err);
    next(null, data);
  });
};