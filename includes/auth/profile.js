/* eslint-disable max-len */
const methods = {
  profileUser: function(req, res, next, salt) {
    console.log('profile');
    User.findOne({unique_id: req.session.userId}, function(err, data) {
      console.log('data');
      console.log(data);
      if (!data) {
        res.redirect('/');
      } else {
        console.log('found');
        return res.render('data.ejs', {'name': data.username, 'email': data.email});
      }
    });
  },
};

exports.methods = methods;
