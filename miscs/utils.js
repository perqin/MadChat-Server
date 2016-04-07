'use strict';

module.exports = {
    hexToNumber: hexToNumber
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
