const mongoose = require('mongoose');
const Bike = require('./model');

mongoose.connect('mongodb://localhost/ManualAuth', {useMongoClient: true});

/* eslint-disable max-len*/
const numBikes = 10;
const latList = [26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831];
const lonList = [26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831, 26.5114831];

const bikeNames = ['Honda', 'Yamaha', 'Honda', 'Yamaha', 'Honda', 'Yamaha', 'Honda', 'Yamaha', 'Honda', 'Yamaha'];

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

/* eslint-disable require-jsdoc*/
function addBike(idx) {
  console.log('Adding bike %d at lat:%d and lon:%d'.green, idx, latList[idx], lonList[idx]);

  bike = new Bike({bike_id: idx,
    bikename: bikeNames[idx],
    location: {Lat: latList[idx], Lon: lonList[idx]},
    status: 0,
  });

  bike.save(function(err, bike) {
    if (err) return console.error(err);
    console.log(bike.bike_id + ' saved to bikes collection.');
  });
};

Bike.remove({}, function(err, bike) {
  if (err) throw err;
  console.log(bike);
  console.log('Old Database cleared');
});

for (let idx = 0; idx < numBikes; idx++) {
  addBike(idx);
};
