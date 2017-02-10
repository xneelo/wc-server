[![Build Status](https://travis-ci.org/hetznerZA/wc-server.svg?branch=master)](https://travis-ci.org/hetznerZA/wc-server)

# wc-server

A super fast web server for serving front-end resources.

Built with [koa](https://www.npmjs.com/package/koa).

This server is perfect for developing bower_components.

## Installation

First, install [npm](https://www.npmjs.com/) (assuming you have pre-installed [node.js](https://nodejs.org/)).

Globally install the server.

```bash
$ npm install -g hetznerZA/wc-server
```

*or*

Add it as a project dependency.

```bash
$ npm install hetznerZA/wc-server --save-dev
```

## Usage

<pre><code><strong>$ wc-server</strong>

  A simple web server to serve front-end resources.

<strong>Options</strong>

  -p, --port number   The port to serve from. Defaults to 8080.
  -c, --component     Serve bower_components directory on root.
  -o, --cors          Enable CORS by setting Access-Control-Allow-Origin headers.
  -n, --no-cache      Set no-cache headers.
  -s, --https         Enable HTTPS.
  -i, --history       History API support. Fallback to root.
  -v, --version       Display version info.
  -h, --help          Display this usage guide.
</code></pre>

## Examples

Run as a bower component development environment.
```bash
$ wc-server --component --no-cache
```

Run with HTTPS enabled
```bash
$ wc-server -s
```

## Use as a module
```javascript
var server = require('wc-server');
var options = {
  https: true,
  'no-cache': true
};
var app = server(options);
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});
```

## Development

Install dependencies
```bash
$ npm install
```

Create a symlink for npm --global development
```bash
$ sudo npm link
```

Run tests
```bash
$ npm test
```

## Todo

- HTTP2 / Spdy
- Import headers config file
- Set custom main file

## License

MIT