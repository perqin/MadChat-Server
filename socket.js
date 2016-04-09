'use strict';

var net = require('net');
// var U = require('./miscs/utils');

var PORT;
var server;
var clients = {};

module.exports = {
    initialize: initialize,
    startServer: startServer
};

function initialize(port) {
    PORT = port;
}

function startServer() {
    server = net.createServer();
    server.listen(PORT);
    console.log('Socket server listening on port ' + PORT);

    server.on('connection', function (sock) {
        sock.on('data', sockDataRouter);
        sock.on('close', sockCloseHandler);
    });
}

function sockDataRouter(data) {
    // TODO: route
    var userId = data.slice(0, 32).toString('ascii');
    // DEBUG
    if (userId !== '00000000000000000000000000000000' && !clients[userId]) return;
    var contentType = data.slice(32, 36).toString('ascii');
    if (contentType === 'json') jsonDataRouter(userId, JSON.parse(data.toString('utf8', 36)));
}

function sockCloseHandler() {
    var sock = this;
    sock.owner.sock = null;
}

function jsonDataRouter(userId, jsonData) {
    var api = jsonData['api'],  data = jsonData['data'];
    if (api === 'send_msg') sendMessage(userId, data);
}

function sendMessage(userId, msgData) {
    // DEBUG
    if (!userId || ! msgData) return;
    var from = msgData['from'], to = msgData['to'], msg = msgData['msg'];
    // DEBUG
    if (!from || !to || !msg) return;
    if (!clients[from['id']] || !clients[to['id']] || userId !== from['id']) return;
    var responseContent = {
        res: 'msg',
        data: {
            from: to,
            to: from,
            msg: msg
        }
    };
    var resBuf = new Buffer('json' + JSON.stringify(responseContent), 'utf8');
    sockDataWriter(to['id'], resBuf);
}

function sockDataWriter(userId, buffer) {
    // DEBUG
    if (!userId || !clients[userId] || !clients[userId].sock) return;
    client[userId].sock.write(buffer);
}
