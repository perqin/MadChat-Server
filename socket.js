'use strict';

var net = require('net');

var HOST;
var PORT;
var server;

module.exports = {
    initialize: initialize,
    startServer: startServer
};

function initialize(host, port) {
    HOST = host;
    PORT = port;
}

var clients = [];

function startServer() {
    server = net.createServer();
    server.listen(PORT);
    console.log('Socket server listening on ' + HOST + ':' + PORT);

    server.on('connection', function (sock) {
        console.log('Remote: ' + sock.remoteAddress + ':' + sock.remotePort);
        sock.write('You are ' + sock.remoteAddress + ':' + sock.remotePort);
        clients.push(sock);
    });
}
