/* eslint-disable max-len */
const crypto = require('crypto');

const methods = {
  loginUser: function(req, res, next, salt) {
    console.log(req.body);
    User.findOne({email: req.body.email}, function(err, data) {
      if (data) {
        if (data.password==crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`)) {
          console.log('Done Login');
          req.session.userId = data.unique_id;
          // console.log(req.session.userId);
          res.send({'Success': 'Success!'});
        } else {
          // console.log(req.body.password);
          console.log(salt);
          res.send({'Success': 'Wrong password!'});
        }
      } else {
        res.send({'Success': 'This Email Is not regestered!'});
      }
    });
  },
};

exports.methods = methods;
