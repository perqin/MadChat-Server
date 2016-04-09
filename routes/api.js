'use strict';

var socketServer = require('../socket');
var express = require('express');
var router = express.Router();

router.get('/users', function(req, res) {
    var userId = req.query.user_id;
    var responseContent = {
        status: userId ? 0 : 1,
        data: userId ? socketServer.getUserList(userId) : []
    };
    res.send(JSON.stringify(responseContent));
});

module.exports = router;
