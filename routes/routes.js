var express = require('express');
var router = express.Router();
var User = require('../models/user');
var crypto = require('crypto');

var salt = "7c3e37274a1536c9c41e311054165984";
router.post('/register', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;
	
	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send({"Success":"Data not supplied"});
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					// var salt = crypto.randomBytes(16).toString('hex');
					User.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: crypto.pbkdf2Sync(personInfo.password, salt,  1000, 64, `sha512`).toString(`hex`),
							// password: personInfo.password,
							passwordConf: crypto.pbkdf2Sync(personInfo.passwordConf, salt,  1000, 64, `sha512`).toString(`hex`),
							// passwordConf: personInfo.passwordConf
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
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==crypto.pbkdf2Sync(req.body.password, salt,  1000, 64, `sha512`).toString(`hex`)){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				// console.log(req.body.password);
				console.log(salt)
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			console.log("found");
			return res.render('data.ejs', {"name":data.username,"email":data.email});
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	console.log(req.session)
	if (req.session) {
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.send({"Status":"OK"});
    	}
    });
}
});

router.post('/forgetpass', function (req, res, next) {
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			if (req.body.password==req.body.passwordConf) {
			data.password=crypto.pbkdf2Sync(req.body.password, salt,  1000, 64, `sha512`).toString(`hex`);
			data.passwordConf=crypto.pbkdf2Sync(req.body.passwordConf, salt,  1000, 64, `sha512`).toString(`hex`);

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

	var request=require('request'); 
router.get('/request', function (req, res, next) {
	console.log("requesting ride");
	Bike.findOne({status:0},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.send("Bikes not available. Please try after some time");
		}else{
			console.log("found");
			console.log(data);
			res.send({"bikeid":data.bike_id, "bikename":data.bikename, "lat":data.location.Lat, "long":data.location.Lon});
		}
	});
	Bike.findOne({status:0},function(err,data){
		console.log("Printing to:")
		console.log('http://0.0.0.0:900'+String(data.bike_id)+'/requestRide/'+String(data.bike_id))
		request.get('http://0.0.0.0:900'+String(data.bike_id)+'/requestRide/'+String(data.bike_id), function (error, response) { 
			console.error('error:', error); 
		})
	});
});

router.post('/endRide', function (req, res, next) {
	console.log("requesting ride end");
	console.log(req.body);
	
	res.send({"Success":"OK"})
});


module.exports = router;