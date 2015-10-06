var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Schema structure
var eventSchema = new Schema({
  eventName: String,
  eventPlace: String,
  eventDate: String,
  eventWith: Array
  created: {type: Date, default: Date.now}
});
// Class based on the schema = model
var Event = mongoose.model('Event', eventSchema);

module.exports = {
  Event: Event
}
