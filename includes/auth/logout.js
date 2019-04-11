const methods = {
  logoutUser: function(req, res, next, salt) {
    console.log('logout');
    console.log(req.session);
    if (req.session) {
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
