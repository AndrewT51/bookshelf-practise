var express = require('express');
var router = express.Router();
var User = require('../models/user');
var validator = require('validator');
var errorMsg = require('../errors.json');
var authorization = require('../auth');

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
  .then(function(user){
    var token = user.generateJWT();
    res.send(token)
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
    req.user = user;
    return user && user.validatePassword(req.body.password);
  })
  .then(function(result){
    checkValid(result,2);
    var token = req.user.generateJWT();
    res.send(token)
  })
  .catch(function(err){
    res.status(err[0]).send(err[1])
  })
})

router.get('/secure', authorization, function(req,res){
  User.where({id: req.user.id})
  .fetch()
  .then(function(user){
    res.send(user)
  })

})

module.exports = router


