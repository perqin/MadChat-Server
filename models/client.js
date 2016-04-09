'use strict';

module.exports = Client;

function Client(id, nickname, sock, address, port) {
    this['userId'] = id;
    this['nickname'] = nickname;
    this['sock'] = sock;
    this['address'] = address || sock.remoteAddress;
    this['port'] = port || sock.remotePort;
    if (sock) sock['owner'] = this;
}
