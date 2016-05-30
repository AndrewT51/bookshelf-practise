var express = require('express');
var router = express.Router();
var db = require('../db');
var data = require('../populate-data.json');
var knex = db.knex;

router.get('/maketables', function(req,res){
  knex.schema.createTableIfNotExists('users', function (table) {
    table.increments();
    table.string('name');
    table.string('password');
    table.string('email').unique();
    table.string('address');
    table.timestamps(true);
  })
  .createTableIfNotExists('addresses', function (table){
    table.increments();
    table.integer('house-number',4);
    table.string('street',100);
    table.string('city',20);
    table.string('postcode',10);
  })
  .then(function(data){
    console.log('Table created: ',data);
    res.send();
  })
})

router.get('/insertdata',function(req,res){
  knex.insert(data, 'id').into('users')
  .then(function(done){
    console.log(done);
    res.send();
  })
})

module.exports = router;