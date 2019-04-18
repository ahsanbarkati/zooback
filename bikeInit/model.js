const mongoose = require('mongoose');
const Schema = mongoose.Schema;

bikeSchema = new Schema( {
  bike_id: Number,
  bikename: String,
  location: Object,
  status: Number,
}),

Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
