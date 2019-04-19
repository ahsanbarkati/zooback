/* eslint-disable require-jsdoc */
require('request');

const methods = {
  processQuery: function(req, res, next) {
    console.log('Processing admin query');
    // Process Request
    const fs = require('fs');
    const exec = require('child_process').exec;
    const mongoose = require('mongoose');
    // mongoose.connect('mongodb://localhost/bikeInit', {useMongoClient: true});

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    });


    const input = 'use ManualAuth\n' + req.body.query;
    const cmdToLaunch = 'python scripts/process.py';
    let result;
    let keys;

    let check;

    function validateJSON(json) {
      try {
        check = JSON.parse(json);
      } catch (e) {
        check = 0;
      }
      return check;
    };
    function writeFile() {
      return new Promise((resolve) => {
        setTimeout(()=>{
          fs.writeFile('scripts/dbinput', input, (err) => {
            if (err) throw err;
            console.log('written to query file');
            resolve('write done');
          });
        }, 200);
      });
    };

    function execUNIX() {
      return new Promise((resolve) => {
        setTimeout(()=>{
          exec(cmdToLaunch, function(error) {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log('written to result file');
          });
          resolve('unix done');
        }, 200);
      });
    };

    function readFile() {
      return new Promise((resolve) => {
        setTimeout(()=>{
          fs.readFile('scripts/result', 'utf-8', (err, data) => {
            if (err) throw err;
            result = data;
            console.log('Read from file');
            resolve('read done');
          });
        }, 200);
      });
    };

    function parseResult() {
      return new Promise((resolve) => {
        setTimeout(()=>{
          const s = result.split('\n');
          console.log(s);
          result = s.slice(5, s.length-2);
          console.log(result);
          for (let i=0; i< result.length; i++) {
            result[i] = '{' + result[i].slice(48,);
            check = validateJSON(result[i]);
            if (check == 0 ) {
              res.send({'Success': 'Failure'});
              console.log('Failure Request Sent');
              resolve('parse done');
              break;
            } else {
              result[i] = JSON.parse(result[i]);
            }
          };
          if (check !=0) {
            keys = Object.keys(result[0]);
            console.log(result);
            console.log('Parsing done');
            res.send({'Success': 'OK', 'result': result, 'keys': keys});
            console.log('Request Sent');
            resolve('parse done');
          };
        }, 200);
      });
    };

    async function msg() {
      check = 0;
      const a = await writeFile();
      const b = await execUNIX();
      const c = await readFile();
      const d = await parseResult();
      console.log(`${a} ${b} ${c} ${d}`);
    };

    try {
      msg();
    } catch (e) {
    }
    // Processing Done
  },
};

exports.methods = methods;
