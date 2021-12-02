const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    year: {
        type: String
    },
    title: {
        type: String
    },
    genre: {
        type: String
    },
    act: {
        type: Boolean
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

MovieSchema.pre('save', function(next){
  now = new Date()
  same=this
  if ( !same.created_at ) {
    same.created_at = now;
    same.offset= now.getTimezoneOffset() 
 }
  next()
 }); 

const Movie = module.exports = mongoose.model('Movie', MovieSchema);
