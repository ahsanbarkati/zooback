/* eslint-disable max-len */
const crypto = require('crypto');

const methods = {
  forgetPass: function(req, res, next, salt) {
    User.findOne({email: req.body.email}, function(err, data) {
      console.log(data);
      if (!data) {
        res.send({'Success': 'This Email Is not regestered!'});
      } else {
        if (req.body.password==req.body.passwordConf) {
          data.password=crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
          data.passwordConf=crypto.pbkdf2Sync(req.body.passwordConf, salt, 1000, 64, `sha512`).toString(`hex`);
          data.save(function(err, Person) {
            if (err) {
              console.log(err);
            } else {
              console.log('Success');
            }
            res.send({'Success': 'Password changed!'});
          });
        } else {
          res.send({'Success': 'Password does not matched! Both Password should be same.'});
        }
      }
    });
  },
};

exports.methods = methods;
