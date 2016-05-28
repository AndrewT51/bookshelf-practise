var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var validator = require('validator');
var errorMsg = require('../errors.json');



function checkValid(checkIsTrue,res,type){
  if(!checkIsTrue){
    throw errorMsg[type]
  }
}

router.get('/',function(req,res){
  res.send('Amazing')
})

router.post('/add',function(req,res){
  user = new User;
  checkValid(validator.isEmail(req.body.email),res,1);
  user.set(req.body);
  user.generatePassword(req.body.password)
  .then(function(data){
    data.save()
    res.send(data);
  })
  .catch(function(err){
    res.status(err[0]).send(err[1])
  })
})

router.post('/login',function(req,res){
  User.where({email:req.body.email})
  .fetch()
  .then(function(user){
      checkValid(user,res,1);
      return user && user.validatePassword(req.body.password, user.attributes.password)
  })
  .then(function(result){
    checkValid(result,res,2);
    var token = jwt.sign({name:"andrew"},'secret');
    res.send(token)
  })
  .catch(function(err){
    res.status(err[0]).send(err[1])
  })
})

module.exports = router