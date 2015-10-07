var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Schema structure
var eventSchema = new Schema({
  name: String,
  place: String,
  date: String,
  with: String,
  created: {type: Date, default: Date.now}
});
// Class based on the schema = model
var Event = mongoose.model('Event', eventSchema);
// exporting event variable
module.exports = {
  Event: Event
};
