var express = require('express');
var router = express.Router();
// var config = require('../config.json');
// var mongoose = require('mongoose');

// var Promise = mongoose.Promise;
// var User = require('../models/user');
// var ObjectId = mongoose.Schema.Types.ObjectId;

/*router.get('/users', function (req, res) {
    var id = req.query.user_id;
    var json = {};
    User
        .where('_id').ne(ObjectId(id))
        .exec()
        .then(function (result) {
            json.data = [].concat(result);
            json.status = 0;
        })
        .catch(function (error) {
            json.status = 1;
            json.data = 'Error: ' + error.message;
        })
        .then(function () {
            res.send(JSON.stringify(json));
        });
});*/

/*router.post('/users', function (req, res) {
    var nickname = req.body.nickname;
    var json = {};
    User.create({
        nickname: nickname
    }).then(function (result) {
        json.status = 0;
        json.data = result.toObject();
    }).catch(function (error) {
        json.status = 1;
        json.data = 'Error';
    }).then(function () {
        res.send(JSON.stringify(json));
    });
});*/

/*router.delete('/users/:id', function (req, res) {
    var user_id = req.params.id;
    var json = {};
    User.remove({
        _id: ObjectId(user_id)
    }).exec().then(function (result) {
        json.status = 0;
        json.data = 'Succeed!';
    }).catch(function (error) {
        json.status = 1;
        json.data = 'Error!';
    }).then(function () {
        res.send(JSON.stringify(json));
    });
});*/

module.exports = router;
