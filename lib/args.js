'use strict';

const nodePackage = require('../package.json');

module.exports = {

  definitions: [
    {
      name: 'port',
      alias: 'p',
      description: 'The port to serve from. Defaults to 8080.',
      type: Number,
      defaultValue: 8080
    },
    {
      name: 'component',
      alias: 'c',
      description: 'Serve bower_components directory on root.',
      type: Boolean,
      defaultValue: false
    },
    {
      name: 'cors',
      alias: 'o',
      description: 'Enable CORS by setting Access-Control-Allow-Origin headers.',
      type: Boolean,
      defaultValue: false
    },
    {
      name: 'no-cache', 
      alias: 'n', 
      description: 'Set no-cache headers.',
      type: Boolean,
      defaultValue: false
    },
    {
      name: 'https', 
      alias: 's', 
      description: 'Enable HTTPS.',
      type: Boolean,
      defaultValue: false
    },
    {
      name: 'history',
      alias: 'i', 
      description: 'History API support. Fallback to root.',
      type: Boolean,
      defaultValue: false
    },
    {
      name: 'root', 
      alias: 'r', 
      description: 'Root directory to host.',
      type: String,
      defaultValue: null
    },
    {
      name: 'version', 
      alias: 'v', 
      description: 'Display version info.',
      type: Boolean,
      defaultValue: false
    },
    {
      name: 'help', 
      alias: 'h', 
      description: 'Display this usage guide.',
      type: Boolean,
      defaultValue: false
    }
  ],

  getUsage: function() {
    return [
      {
        header: nodePackage.name,
        content: nodePackage.description
      },
      {
        header: 'Options',
        optionList: this.definitions
      }
    ];
  }

};