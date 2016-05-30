var db = require('../db');
var Bookshelf = db.Bookshelf;
var Promise = require('bluebird');
var config = require('../config');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var jwt = require('jsonwebtoken');

var User = Bookshelf.Model.extend({
  tableName: 'users',
  addresses: function() {
    return this.hasOne(Address);
  },

  generatePassword: function(password){
    var self = this;
    return bcrypt.hashAsync(password, 10)
    .then(function(hash){
      return self.set('password',hash)
    })
  },

  validatePassword: function(password){
    var hash = '$2a' + this.get('password').substring(3);
    return bcrypt.compareAsync(password, hash)
  },

  generateJWT: function(){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: this.get('id'),
      name: this.get('name'),
      email: this.get('email'),
      exp: parseInt(exp.getTime()/1000)
    }, config.JWT_SECRET);
  }
});

module.exports = Bookshelf.model('User', User);


