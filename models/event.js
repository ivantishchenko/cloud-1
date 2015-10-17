var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Schema structure
var eventSchema = new Schema({
  name: {type: String, required: 'Please enter event\'s name'},
  place: {type: String, required: 'Please enter event\'s place'},
  priority: String,
  with: String,
  created: {type: Date, default: Date.now}
});
// Class based on the schema = model
var Event = mongoose.model('Event', eventSchema);
// exporting event variable
module.exports = {Event: Event};
