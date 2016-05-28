var db = require('../db');
var Bookshelf = db().Bookshelf;
var knex = db().knex;

var Address = bookshelf.Model.extend({
  tableName: 'addresses',
  user: function() {
    return this.belongsTo(User);
  }
});

module.exports = Bookshelf.model('Address', Address);