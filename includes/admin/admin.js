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
          result = s.slice(5, s.length-2);
          for (let i=0; i< result.length; i++) {
            result[i] = '{' + result[i].slice(48,);
            result[i] = JSON.parse(result[i]);
          };
          console.log(result);
          console.log('Parsing done');
          res.send({'Success': 'OK', 'result': result});
          console.log('Request Sent');
          resolve('parse done');
        }, 200);
      });
    };

    async function msg() {
      const a = await writeFile();
      const b = await execUNIX();
      const c = await readFile();
      const d = await parseResult();
      console.log(`${a} ${b} ${c} ${d}`);
    };

    msg();
    // Processing Done
  },
};

exports.methods = methods;
