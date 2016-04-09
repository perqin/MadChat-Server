'use strict';

var shortid = require('shortid');
// TODO: need other package
// shortid.characters('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef');


module.exports = {
    hexToNumber: hexToNumber,
    genUid: genUid
};

function hexToNumber(hex, start, count) {
    var s = 0, c;
    if (Object.prototype.toString.call(hex) === '[object String]') {
        for (var i = start; i < start + count; ++i) {
            if (i < 0) continue;
            if (i >= hex.length) break;
            c = hex.charCodeAt(i);
            if (c >= 48 && c <= 57) {
                s += c - 48;
            } else if (c >= 65 && c <= 70) {
                s += c - 55;
            } else if (c >= 97 && c <= 102) {
                s += c - 87;
            } else {
                throw { error: 'Unexpected char in hex string' };
            }
        }
    }
    return s;
}

function genUid(length) {
    var len = length || 32;
    var str = '';
    while (str.length < len) {
        str += shortid.generate();
    }
    return str.slice(0, len);
}
