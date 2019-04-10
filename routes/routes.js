var express = require('express');
var request=require('request'); 

var router = express.Router();
var User = require('../models/user');
var crypto = require('crypto');

// Import Authentication Modules
var register = require('../includes/auth/register')
var login = require('../includes/auth/login')
var profile = require('../includes/auth/profile')
var logout = require('../includes/auth/logout')
var forgetPassword = require('../includes/auth/forgetPass')

// Import Ride Modules
var requestRide = require('../includes/ride/requestRide')
var endRide = require('../includes/ride/endRide')

var salt = "7c3e37274a1536c9c41e311054165984";


// Authentication Routes
router.post('/register', function(req, res, next) {
	register.methods.registerUser(req, res, next, salt);
});

router.post('/login', function (req, res, next) {
	login.methods.loginUser(req,res, next, salt);
});

router.get('/profile', function (req, res, next) {
	profile.methods.profileUser(req, res, next, salt);
});

router.get('/logout', function (req, res, next) {
	logout.methods.logoutUser(req,res,next);
});

router.post('/forgetpass', function (req, res, next) {
	forgetPassword.methods.forgetPass(req,res,next, salt);
});


// Ride Routes
router.get('/request', function (req, res, next) {
	requestRide.methods.requestRide(req,res,next);
});

router.post('/endRide', function (req, res, next) {
	endRide.methods.endRide(req,res,next);
});

module.exports = router;