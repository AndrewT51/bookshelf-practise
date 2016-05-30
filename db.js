var mysql = require('mysql');
var config = require('./config');
var knex = require('knex')({
  client: 'mysql',
  connection: config.database
})
var Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin('registry');

module.exports = {
  Bookshelf: Bookshelf,
  knex: knex
}

