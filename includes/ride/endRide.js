require('request');

const methods = {
  endRide: function(req, res, next) {
    console.log('requesting ride end');
    console.log(req.body);
    res.send({'Success': 'OK'});
  },
};

exports.methods = methods;
