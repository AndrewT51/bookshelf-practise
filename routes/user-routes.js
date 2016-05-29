var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var validator = require('validator');
var errorMsg = require('../errors.json');

function checkValid(checkIsTrue,type){
  if(!checkIsTrue){
    throw errorMsg[type]
  }
}

router.post('/add',function(req,res){
  user = new User;
  checkValid(validator.isEmail(req.body.email),1);
  user.set(req.body);
  user.generatePassword(req.body.password)
  .then(function(data){
    return data.save()
  })
  .then(function(){
    res.send(data);
  })
  .catch(function(err){
    if(err[0]){
      res.status(err[0]).send(err[1])
    }
    res.send(err)
  })
})

router.post('/login',function(req,res){
  User.where({email:req.body.email})
  .fetch()
  .then(function(user){
    checkValid(user,1);
    req.user = user && user.attributes;
    return user && user.validatePassword(req.body.password);
  })
  .then(function(result){
    delete req.user.password
    checkValid(result,2);
    var token = jwt.sign(req.user,'secret');
    res.send(token)
  })
  .catch(function(err){
    res.status(err[0]).send(err[1])
  })
})

module.exports = router


