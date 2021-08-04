const express = require('express');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const path = require('path');

const apiForwardingUrl = 'http://localhost:56719';

const proxyOptions = {
  changeOrigin: true,
  secure: false
};

httpProxy.prototype.onError = function (err) {
  console.log(err);
};

const apiProxy = httpProxy.createProxyServer(proxyOptions);

console.log('Forwarding API requests to ' + apiForwardingUrl);

// Node express server setup.
const server = express();
server.set('port', 4200);
server.use(express.static(path.join( __dirname, 'public')));

server.all("/api/*", function(req, res) {
  apiProxy.web(req, res, {target: apiForwardingUrl});
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('*', (req, res) => {
  res.sendFile(__dirname +'/public/index.html');
});

// Start Server.
server.listen(server.get('port'), function() {
  console.log('Express server listening on port ' + server.get('port'));
});
