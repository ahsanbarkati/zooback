const express = require('express');
require('request');
// eslint-disable-next-line new-cap
const router = express.Router();
require('../models/user');

// Import Authentication Modules
const register = require('../includes/auth/register');
const login = require('../includes/auth/login');
const profile = require('../includes/auth/profile');
const logout = require('../includes/auth/logout');
const forgetPassword = require('../includes/auth/forgetPass');

// Import Ride Modules
const requestRide = require('../includes/ride/requestRide');
const endRide = require('../includes/ride/endRide');
const admin = require('../includes/admin/admin');

const salt = '7c3e37274a1536c9c41e311054165984';


// Authentication Routes
router.post('/register', function(req, res, next) {
  register.methods.registerUser(req, res, next, salt);
});

router.post('/login', function(req, res, next) {
  login.methods.loginUser(req, res, next, salt);
});

router.get('/profile', function(req, res, next) {
  profile.methods.profileUser(req, res, next, salt);
});

router.get('/logout', function(req, res, next) {
  logout.methods.logoutUser(req, res, next);
});

router.post('/forgetpass', function(req, res, next) {
  forgetPassword.methods.forgetPass(req, res, next, salt);
});


// Ride Routes
router.post('/request', function(req, res, next) {
  requestRide.methods.requestRide(req, res, next);
});

router.post('/endRide', function(req, res, next) {
  endRide.methods.endRide(req, res, next);
});

router.post('/admin', function(req, res, next) {
  admin.methods.processQuery(req, res, next);
});

module.exports = router;
