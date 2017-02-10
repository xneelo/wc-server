'use strict';

const path = require('path');
const koa = require('koa');
const send = require('koa-send');

module.exports = function(options) {
  var app = koa();
  options = options || {};
  var root = options.root || process.cwd();
  // static host
  app.use(function*(next) {
    yield* next;
    yield send(this, this.path, {
      root: path.resolve(path.join(root, '/')), 
      index: 'index.html'
    });
  });
  // --component
  if (options.component) {
    app.use(function*(next) {
      yield* next;
      if (this.response.status != 200) {
        yield send(this, this.path, {
          root: path.resolve(path.join(root, '/bower_components'))
        });
      }
    });
  }
  // --history
  if (options.history) {
    app.use(function*(next) {
      yield* next;
      if (this.response.status != 200) {
        yield send(this, '/', {
          root: path.resolve(root),
          index: 'index.html'
        });
      }
    });
  }
  // --no-cache
  if (options['no-cache']) {
    app.use(function*(next) {
      yield* next;
      this.set('Cache-Control', 'no-store, no-cache, must-revalidate');
      this.set('Pragma', 'no-cache');
      this.set('Expires', 0);
    });
  }
  // --cors
  if (options['cors']) {
    app.use(function*(next) {
      yield* next;
      this.set('Access-Control-Allow-Origin', '*');
      this.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Range');
    });
  }
  return app;
}