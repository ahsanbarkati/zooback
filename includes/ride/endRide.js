require('request');

const methods = {
  endRide: function(req, res, next) {
    const rideInfo = req.body;
    console.log('requesting ride end');
    console.log(req.body);
    Ride.findOne({}, function(err, data) {
      if (data) {
        id_ = data.RideID + 1;
      } else {
        id_ = 1;
      }
      var userid;
      Bike.findOne({bike_id: rideInfo.RideID}, function(err, data) {
        // console.log(data);
        userid = data.status;
      });

      const newRide = new Ride({
        RideID: id_,
        BikeId: rideInfo.RideID,
        UserID: userid,
        Src: {Lat:rideInfo.Src.Lat , long:rideInfo.Src.Lon},
        Dest: {Lat:rideInfo.Dest.Lat , long:rideInfo.Dest.Lon},
        StartTime: rideInfo.StartTime,
        EndTime: rideInfo.EndTime, 
        Distance: rideInfo.Distance,
      });
      newRide.save(function(err, ride) {
        if (err) {
          console.log(err);
        } else {
          console.log('Success');
        }
      });
    }).sort({_id: -1}).limit(1);

    var myquery = { bike_id: rideInfo.RideID };
    var newvalues = { $set: {status:  0} };
    Bike.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });

    res.send({'Success': 'OK'});
  },
};

exports.methods = methods;
