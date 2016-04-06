'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    // Mongoose generate _id by default
    nickname: String,
    address: String,
    port: Number,
    // Last active time
    alive: Number
}, {
    versionKey: false
});

var User = module.exports = mongoose.model('User', userSchema);
