var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');



function handler(result,other){
  if(result === true){
    var token = jwt.sign({name:"andrew"},'secret');
    return token
  }
  return
}

router.get('/',function(req,res){
  res.send('Amazing')
})

router.post('/add',function(req,res){
  user = new User;
  user.set(req.body);
  user.generatePassword(req.body.password)
  .then(function(data){
    data.save()
    res.send(data);
  })
})

router.post('/login',function(req,res){
  User.where({email:req.body.email})
  .fetch()
  .then(function(user){
    user.validatePassword(req.body.password, user.attributes.password)
    .then(handler)
    .then(function(token){
      res.send(token)
    })
  })
})




module.exports = router