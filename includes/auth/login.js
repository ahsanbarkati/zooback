/* eslint-disable max-len */
const crypto = require('crypto');
var token = crypto.randomBytes(20).toString('hex');
const methods = {
  loginUser: function(req, res, next, salt) {
    console.log(req.body);
    User.findOne({email: req.body.email}, function(err, data) {
      if (data) {
        if (data.password==crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`)) {
          console.log('Done Login');
          var myquery = { email: data.email };
          var newvalues = { $set: {Token: token } };
          User.updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
          });
          req.session.userId = data.unique_id;
          // console.log(req.session.userId);
          res.send({'Success': 'Success!',UserId: data.unique_id, Token: token});
          // return res.json({token: jwt.sign({ email: data.email,  _id: data._id}, 'RESTFULAPIs')});
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
