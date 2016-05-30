// This package decodes the jwt and attaches the decoded claims to req.user
var jwt = require('express-jwt');
var config = require('./config');
var auth = jwt({secret: config.JWT_SECRET});

module.exports = auth;