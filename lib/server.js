'use strict';

const path = require('path');
const findPort = require('find-port');
const makeApp = require('./app');

module.exports = start;

function start(options) {
  options = options || {};
  options.port = options.port || process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    checkPort(options.port).then(() => {
      var app = makeApp(options);
      serve(app, options).then(resolve).catch(reject);
    }).catch(err => {
      reject(err);
    })
  });
}

function checkPort(port) {
  return new Promise((resolve, reject) => {
    findPort('127.0.0.1', [port], function(ports) {
      if (ports[0]) {
        resolve();
      } else {
        reject(Error(`Port ${port} is in use.`));
      }
    });
  });
}

function serve(app, options) {
  return new Promise((resolve, reject) => {
    try {
      if (options.https) {
        var https = require('https');
        var fs = require('fs');
        https.createServer({
          key: fs.readFileSync(path.resolve(__dirname, '../ssl/signed-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, '../ssl/signed-cert.pem'))
        }, app.callback()).listen(options.port, () => {
          resolve(options);
        });
      } else {
        app.listen(options.port, () => {
          resolve(options);
        });
      }
    } catch (err) {
      reject(err);
    }
  });
}