var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	password: String,
	passwordConf: String
}),
bikeSchema = new Schema( {
	bike_id: Number,
	bikename: String,
	location: Object,
	status: Number
}),
User = mongoose.model('User', userSchema);
Bike = mongoose.model('Bike',bikeSchema);

module.exports = User;
// module.exports = Bike;