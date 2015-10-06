// load Event class
var Event = require('../models/event').Event;

exports.addEvent = function(event, next) {
  var newEvent = new Event({
    eventName: String: event.eventName,
    eventPlace: String: event.eventPlace,
    eventDate: String: event.eventDate,
    eventWith: Array: event.eventWith
  });

  newEvent.save(function(err) {
    if (err) {
      return next(err);
    }
    next(null);
  });
};
