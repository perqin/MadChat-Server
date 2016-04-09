'use strict';

module.exports = Client;

function Client(id, nickname, address, port, sock) {
    this['userId'] = id;
    this['nickname'] = nickname;
    this['address'] = address;
    this['port'] = port;
    this['sock'] = sock;
    if (sock) sock['owner'] = this;
}