/* eslint-disable max-len */
const methods = {
  profileUser: function(req, res, next, salt) {
    console.log('profile');
    User.findOne({unique_id: req.body.UserId}, function(err, data) {
      console.log('data', data);
      console.log(req.body);
      if (!data) {
        res.redirect('/');
      } else {
        if (req.body.Token == data.Token) {
          console.log('found');
          // console.log(req.query.Token)
          res.send({name: data.username, email: data.email});
        }
      }  
    });
  },
};

exports.methods = methods;
