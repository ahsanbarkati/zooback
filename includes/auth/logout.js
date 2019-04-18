const methods = {
  logoutUser: function(req, res, next, salt) {
    console.log('logout');
    console.log(req.session);
    if (req.session) {
      var myquery = { unique_id: req.session.userId };
          var newvalues = { $set: {Token: null } };
          User.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
          });
      req.session.destroy(function(err) {
        if (err) {
          return next(err);
        } else {
          return res.send({'Status': 'OK'});
        }
      });
    }
  },
};

exports.methods = methods;
