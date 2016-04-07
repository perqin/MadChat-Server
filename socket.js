'use strict';

var net = require('net');
var U = require('./miscs/utils');

var PORT;
var server;
var clients = [];

module.exports = {
    initialize: initialize,
    startServer: startServer
};

function initialize(port) {
    PORT = port;
}
var client_ = [];
function startServer() {
    server = net.createServer();
    server.listen(PORT);
    console.log('Socket server listening on port ' + PORT);

    server.on('connection', function (sock) {
        console.log('Remote: ' + sock.remoteAddress + ':' + sock.remotePort);
        // sock.setEncoding('utf8');
        sock.on('data', sockDataRouter);
        sock.on('close', function () {
            console.log('closed');
        });
        client_.push(sock);
    });
}

function sockDataRouter(data) {
    // TODO: route
    // var json = JSON.parse(data);
    // var type = Object.prototype.toString.call(data);
    // if (type === '[object String]') {
    // } else if (type === '[object Buffer]') {
        // TODO
    // }
}

function storeClient(sock, id) {
    var i = U.hexToNumber(id);
    if (!clients[i]) {
        clients[i] = [];
    }
    clients[i].push({
        id: id,
        sock: sock
    });
}
