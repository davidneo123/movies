'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

router.post('/register', (req, res, next) => {
  let newUser = new User(req.body);

  User.addUser(newUser, (err, user) => {
    if(err){
     res.json({success: false, msg:'Fail registering user'});
    } else {
      res.json({success: true, msg:'User registered'}).status(201);
    }
  });
});

router.put('/', function(req,res,next) {
  let newUser = new User(req.body)
  newUser.updated_at=new Date()
  User.editUser(newUser, function(err,user){
    if(err){
    res.json({success: false, msg:'Error updating user'});
    } else {
      res.json({success: true, msg:'User updated'}).status(204);
    }
    });
})

router.get('/:id', function(req,res) {
  const id=req.params.id;
  User.getUserById(id,function(err,resource){
    if(err){
     return res.send(err).status(404);
    } else{
      res.json(resource).status(200);
    }
    })
})

router.get('/',function(req,res){
    User.find(function(err,resource){
    if(err){
      res.send(err).status(404);
    } else {
      res.send(resource).status(200);
    }
  });
});

router.delete('/:id', (req, res,next) => {
  let id = req.params.id;
  User.remove({_id:id}, function(err,resource){
    if(err){
     return res.send(err).status(501);
    } else{
      res.send(resource).status(201);
    }
  })
})

router.get('/email/:email', function(req,res) {
  const email=req.params.email;
  User.getUserByEmail(email,function(err,resource){
    if(err){
     return res.send(err).status(501);
    } else{
      res.json(resource).status(201);
    }
    })
})

router.get('/:userid', function(req,res) {
  const userid=req.params.userid;
  User.findById(userid,function(err,resource){
    if(err){
     return res.send(err).status(501);
    } else{
      res.json(resource).status(201);
    }
    })
})

router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 1200 // 20 mins
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            _id: user._id,
            id: user.id,
            name: user.name,
            email: user.email,
            email: user.email,
            act: user.act
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong Password'});
      }
    });
  });
});


module.exports = router;
