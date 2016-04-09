'use strict';

var net = require('net');
var Client = require('./models/client');
var U = require('./miscs/utils');

var PORT;
var server;
var clients = {};

module.exports = {
    initialize: initialize,
    startServer: startServer,
    getUserList: getUserList
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

function getUserList(userId) {
    var r = [];
    for (var k in clients) {
        if (k !== userId) {
            r.push({
                type: 'user',
                id: clients[k].userId,
                nickname: clients[k].nickname
            });
        }
    }
    return r;
}

function sockDataRouter(data) {
    var userId = data.slice(0, 32).toString('ascii');
    // DEBUG
    if (userId !== '00000000000000000000000000000000' && !clients[userId]) return;
    var contentType = data.slice(32, 36).toString('ascii');
    if (contentType === 'json') jsonDataRouter(this, userId, JSON.parse(data.toString('utf8', 36)));
}

function sockCloseHandler() {
    var sock = this;
    sock.owner.sock = null;
}

function jsonDataRouter(sock, userId, jsonData) {
    var api = jsonData['api'],  data = jsonData['data'];
    if (api === 'get_user_id') newUserLogOn(sock, userId, data);
    if (api === 'send_msg') sendMessage(userId, data);
}

function newUserLogOn(sock, userId, userData) {
    if (userId !== '00000000000000000000000000000000' || !userData) return;
    var nickname = userData['nickname'];
    if (!nickname) return;
    var uid = U.genUid(32);
    clients[uid] = new Client(uid, nickname, sock);
    var responseContent = {
        res: 'user_id',
        data: {
            user_id: uid
        }
    };
    var resBuf = new Buffer('json' + JSON.stringify(responseContent), 'utf8');
    sockDataWriter(uid, resBuf);
}

function sendMessage(userId, msgData) {
    // DEBUG
    if (!userId || !msgData) return;
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
    responseContent.data.msg['ts'] = Math.floor(new Date() / 1000);
    var resBuf = new Buffer('json' + JSON.stringify(responseContent), 'utf8');
    sockDataWriter(to['id'], resBuf);
}

function sockDataWriter(userId, buffer) {
    // DEBUG
    if (!userId || !clients[userId] || !clients[userId].sock) return;
    clients[userId].sock.write(buffer);
}
