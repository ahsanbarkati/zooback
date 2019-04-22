require('request');

const methods = {
  endRide: function(req, res, next) {
    const rideInfo = req.body;
    console.log('requesting ride end');
    console.log(req.body);


    // eslint-disable-next-line require-jsdoc
    function saveData() {
      return new Promise((resolve) => {
        setTimeout(()=>{
          Ride.findOne({}, function(err, data) {
            if (data) {
              id_ = data.RideID + 1;
            } else {
              id_ = 1;
            }
            let userid;
            Bike.findOne({bike_id: rideInfo.RideID}, function(err, data) {
              console.log('Bike data at endride: ', data);
              userid = data.status;
              const newRide = new Ride({
                RideID: id_,
                BikeId: rideInfo.RideID,
                UserID: userid,
                Src: {Lat: rideInfo.Src.Lat, Lon: rideInfo.Src.Lon},
                Dest: {Lat: rideInfo.Dest.Lat, Lon: rideInfo.Dest.Lon},
                StartTime: rideInfo.StartTime,
                EndTime: rideInfo.EndTime,
                Distance: rideInfo.Distance,
              });
              console.log('Saving endride Data', newRide);
              newRide.save(function(err, ride) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Success');
                }
              });
            });
          }).sort({_id: -1}).limit(1);
          resolve('Data Saved');
        }, 200);
      });
    };


    // eslint-disable-next-line require-jsdoc
    function updateBike() {
      return new Promise((resolve) => {
        setTimeout(()=>{
          const myquery = {bike_id: rideInfo.RideID};
          const newvalues = {$set: {status: 0}, location: {Lat: rideInfo.Dest['Lat'], Lon: rideInfo.Dest['Lon']}};
          Bike.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log('1 document updated');
          });
          resolve('BikeData Updated');
        }, 200);
      });
    };

    // eslint-disable-next-line require-jsdoc
    function sendRequest() {
      return new Promise((resolve) => {
        setTimeout(()=>{
          res.send({'Success': 'OK'});
          resolve('Request Send');
        }, 200);
      });
    };

    // eslint-disable-next-line require-jsdoc
    async function msg() {
      check = 0;
      const a = await saveData();
      const b = await updateBike();
      const c = await sendRequest();
      console.log(`${a} ${b} ${c}`);
    };
    msg();
  },
};

exports.methods = methods;
