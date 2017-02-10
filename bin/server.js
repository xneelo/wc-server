#!/usr/bin/env node

'use strict';

const args = require('../lib/args.js');
const commandLineArgs = require('command-line-args');

// print usage
function printHelp() {
  var commandLineUsage = require('command-line-usage');
  console.log(commandLineUsage(args.getUsage()));
}

// get options, help on invalid
var options = {};
try {
  options = commandLineArgs(args.definitions);
} catch(err) {
  printHelp();
  return;
}

// --version
if (options.version) {
  const nodePackage = require('../package.json');
  console.log(nodePackage.version);
  return;
}

// --help
if (options.help) {
  printHelp();
  return;
}

// start server
var server = require('../lib/server.js');
var app = server(options).then(options => {
  var ip = require('my-local-ip')();
  var protocol = options.https ? 'https' : 'http';
  console.log(
    `\r\nServer is running and available at\r\n\r\n`+
    `${protocol}://localhost:${options.port}\r\n`+
    `${protocol}://127.0.0.1:${options.port}\r\n`+
    `${protocol}://${ip}:${options.port}`
  );
}).catch(err => {
  console.error(err);
});

// exit process
process.on('SIGINT', function() {
  process.exit();
});