var db = require('../db');
var Bookshelf = db().Bookshelf;
// var knex = db().knex;
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var User = Bookshelf.Model.extend({
  tableName: 'users',
  addresses: function() {
    return this.hasOne(Address);
  },
  generatePassword: function(password){
    var self = this;
    return bcrypt.hashAsync(password, 10)
    .then(function(hash){
      self.set('password',hash)
      return self
    })
  },
  validatePassword: function(password){
    return bcrypt.compareAsync(password, this.get(password))
  }
});

module.exports = Bookshelf.model('User', User);


