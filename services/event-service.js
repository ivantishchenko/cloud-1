// load Event class
var Event = require('../models/event').Event;

exports.addEvent = function(event, next) {
  var newEvent = new Event({
    name: event.name,
    place: event.place,
    date: event.date,
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
