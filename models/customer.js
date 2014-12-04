var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var customerSchema = new Schema({
  name: String,
  channel: String,
  reseller: String,
  startdate: String,
  enddate: String,
  term: Number,
  autorenew: String,
  checkscommitted: Number,
  browserchecks: Number,
  urlchecks: Number,
  contractvalue: Number,
  daysremaining: Number,
  comments: String,
  sflink: String
})

module.exports = mongoose.model('Customer', customerSchema);
