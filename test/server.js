'user strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const server = require('../lib/server.js');
const http = require('http');
const request = require('req-then');

var PORT = process.env.PORT || 9090;

suite('server', () => {

  test('it can start', done => {
    server({
      port: PORT,
      root: __dirname,
      component: true,
      cors: true,
      https: true,
      history: true,
      'no-cache': true
    }).then(() => {
      done();
    }).catch(done);
  });

  test('it can listen to a port', done => {
    request(`https://localhost:${PORT}`).then(response => {
      done();
    }).catch(done);
  });

  test('it uses https', done => {
    request(`https://localhost:${PORT}`).then(response => {
      done();
    }).catch(done);
  });

  test('it uses defined port', done => {
    request(`https://localhost:${PORT}`).then(response => {
      done();
    }).catch(done);
  });

  test('it uses CORS headers', done => {
    request(`https://localhost:${PORT}`).then(response => {
      var headers = response.res.headers;
      if (headers['access-control-allow-origin'] == '*' && headers['access-control-allow-headers'] == 'Origin, X-Requested-With, Content-Type, Accept, Range') {
        done();
      } else {
        done(Error("Header 'access-control-allow-origin' was not set"));
      }
    }).catch(done);
  });

  test('it uses no-cache headers', done => {
    request(`https://localhost:${PORT}`).then(response => {
      var headers = response.res.headers;
      if (headers['cache-control'] == 'no-store, no-cache, must-revalidate' && headers['pragma'] == 'no-cache') {
        done();
      } else {
        done(Error("Header 'no-cache' was not set"));
      }
    }).catch(done);
  });

  test('it supports history api fallback', done => {
    request(`https://localhost:${PORT}/history/path`).then(response => {
      var body = (response.data).toString('utf8');
      if (response.res.statusCode == 200 && body === 'test') {
        done();
      } else {
        done(Error('History API is not supported'));
      }
    }).catch(done);
  });

  test('it serves static content', done => {
    request(`https://localhost:${PORT}/test-file.txt`).then(response => {
      var body = (response.data).toString('utf8');
      if (response.res.statusCode == 200 && body === 'test') {
        done();
      } else {
        done(Error(`Got bad response code '${response.res.statusCode}'`));
      }
    }).catch(done);
  });

  test('it can serve bower_components on root', done => {
    request(`https://localhost:${PORT}/test-component/test-component.txt`).then(response => {
      var body = (response.data).toString('utf8');
      if (response.res.statusCode == 200 && body === 'test') {
        done();
      } else {
        done(Error(`Got bad response code '${response.res.statusCode}'`));
      }
    }).catch(done);
  });

});