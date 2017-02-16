'use strict';

const makeApp = require('../lib/app.js');
const assert = require('chai').assert;
const http = require('http');
const supertest = require('supertest');

var PORT = process.env.PORT || 9090;

suite('app', () => {

  test('returns an app', () => {
    var app = makeApp({
      root: __dirname
    });
    assert.isOk(app);
  });
  
  test('app serves static content', done => {
    var app = makeApp({
      root: __dirname
    });
    var server = http.createServer(app.callback()).listen(PORT);
    supertest.agent(server).get('/test-file.txt').expect(200).end(() => {
      server.close();
      done.call(arguments);
    });
  });

  test('app serves component content', done => {
    var app = makeApp({
      root: __dirname,
      component: true
    });
    var server = http.createServer(app.callback()).listen(PORT);
    supertest.agent(server).get('/test-component/test-component.txt').expect(200).end(() => {
      server.close();
      done.call(arguments);
    });
  });
  
});