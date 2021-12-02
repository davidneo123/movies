const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/database')

mongoose.Promise = global.Promise

const UserSchema = mongoose.Schema({
  
  id: {
    type: String
  },
  tip: {
    type:String
  },
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  act:{
    type:Boolean
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  offset: {
      type: String
  }
})

 UserSchema.pre('save', function(next){
 now = new Date()
 same=this;
 if ( !same.created_at ) {
   same.created_at = now;
   same.offset= now.getTimezoneOffset() 
}
 next()
}); 

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, resource){
  User.findById(id, resource);
}

module.exports.getUserByEmail = function(email, resource){
  const query = {email: {$regex: new RegExp('^' + email, 'i')}}
  User.findOne(query, resource);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.editUser = function(newUser, callback){
    let id=newUser._id;
    this.getUserById(id, (err, user) => {
    if(err) throw err;
    if(user){  
      if(newUser.password===user.password){
    User.updateOne({_id:id},newUser, function(err,resource){
                if(err) throw err;
            callback(null, resource);
          });
      }else{
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            User.updateOne({_id:id},newUser, function(err,resource){
                if(err) throw err;
                callback(null, resource);
          });
          });
        });
      }    
   }
 })
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
