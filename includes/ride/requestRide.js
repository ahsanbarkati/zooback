const request = require('request');

const methods = {
  requestRide: function(req, res, next) {
    console.log('requesting ride');
    Bike.findOne({status: 0}, function(err, data) {
      console.log('data');
      console.log(data);
      if (!data) {
        res.send('Bikes not available. Please try after some time');
      } else {
        console.log('found');
        console.log(data);
        res.send({
          'bikeid': data.bike_id,
          'bikename': data.bikename,
          'lat': data.location.Lat,
          'long': data.location.Lon});
      }
    });
    Bike.findOne({status: 0}, function(err, data) {
      console.log('Printing to:');
      console.log('http://0.0.0.0:900'+String(data.bike_id)+'/requestRide/'+String(data.bike_id));
      request.get('http://0.0.0.0:900'+String(data.bike_id)+'/requestRide/'+String(data.bike_id), function(error, response) {
        console.error('error:', error);
      });
    });
  },
};

exports.methods = methods;
