const request = require('request');

const methods = {
  requestRide: function(req, res, next) {
    console.log('requesting ride');
    User.findOne({unique_id: req.body.userID}, function(err, data) {
      console.log(req.body);
      if(req.body.token == data.Token) {
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
          var myquery = { bike_id: data.bike_id };
          var newvalues = { $set: {status:  req.body.userID} };
          Bike.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
          });
        });
      });
    }
  });

  },
};

exports.methods = methods;
