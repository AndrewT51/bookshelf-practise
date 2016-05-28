var mysql = require('mysql');
var knex = require('knex')({
  client: 'mysql',
   connection: {
     host     : '127.0.0.1',
     user     : 'root',
     password : 'dbpassword123',
     database : 'test'
   }
})
var Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin('registry');

module.exports = function(){
  return {
    Bookshelf: Bookshelf,
    knex: knex
  }
}

