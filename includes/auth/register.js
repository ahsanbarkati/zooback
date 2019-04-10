var crypto = require('crypto')

var methods = { }
methods = {
    registerUser: function(req, res, next, salt){
        console.log(req.body);
        var personInfo = req.body;
        
        if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
            res.send({"Success":"Data not supplied"});
        } else {
            if (personInfo.password == personInfo.passwordConf) {
                User.findOne({email:personInfo.email},function(err,data){
                    if(!data){
                        var id_;
                        User.findOne({},function(err,data){

                            if (data) {
                                id_ = data.unique_id + 1;
                            }else{
                                id_ = 1;
                            }

                            var newPerson = new User({
                                unique_id: id_,
                                email: personInfo.email,
                                username: personInfo.username,
                                password: crypto.pbkdf2Sync(personInfo.password, salt,  1000, 64, `sha512`).toString(`hex`),
                                passwordConf: crypto.pbkdf2Sync(personInfo.passwordConf, salt,  1000, 64, `sha512`).toString(`hex`),
                            });

                            newPerson.save(function(err, Person){
                                if(err)
                                    console.log(err);
                                else
                                    console.log('Success');
                            });

                        }).sort({_id: -1}).limit(1);
                        res.send({"Success":"You are regestered,You can login now."});
                    }else{
                        res.send({"Success":"Email is already used."});
                    }

                });
            }else{
                res.send({"Success":"password is not matched"});
            }
        }
    } 
};

exports.methods = methods;