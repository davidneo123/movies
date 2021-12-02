const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.post('/', (req, res, next) => {
  let movie = new Movie(req.body);
  movie.save(function(err,resource){
    if(err){
     return res.send(err).status(501);
    } else{
      res.json(resource).status(201);
    }
    });
});

router.get('/',function(req,res){
  Movie.find({},function(err,resource){
    if(err){
      res.send(err).status(404);
    } else {
      res.send(resource).status(200);
    }
  });
});

router.delete('/', (req, res,next) => {
  let id = req.params.id;
  Movie.remove({_id:id}, function(err,resource){
    if(err){
     return res.send(err).status(501);
    } else{
      res.send(resource).status(201);
    }
  })
})

router.get('/:id', function(req,res) {
  let id=req.params.id;
  Movie.findById(id,function(err,resource){
    if(err){
     return res.send(err).status(501);
    } else{
      res.json(resource).status(201);
    }
    })
})

router.put('/', function(req,res,next) {
  let movie = new Movie(req.body);
  let id=movie._id;
  movie.updated_at=new Date()
  movie.updateOne({_id:id},movie, function(err,resource){
    if(err){
     return res.send(err).status(501);
    } else{
      res.json(resource).status(201);
    }
    });
})

module.exports = router;