var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://meng:meng@ds021751.mlab.com:21751/drawlist', function (err, db) {
  if (err) throw err
  // db.collection('drawtable').createIndex({ "_id": 1, "name": 1, "spouse":1 })
  // Get all members
  router.get('/draw', function (req, res, next) {
    db.collection('drawtable').find().toArray(function (err, result) {
      if (err) throw err

      res.json(result);
    })
  });

  // Get one member
  router.get('/draw/:name', function (req, res, next) {
    db.collection('drawtable').findOne({name: req.params.name}, function (err, result) {
      if (err) throw err
      res.json(result);
    })
  });

  // Add a member
  router.post('/draw', function (req, res, next) {
    var person = req.body;
    if(!person.name){
      res.status(400);
      res.json({
        'error': 'Bad Data'
      })
    } else {
      db.collection('drawtable').save(person, { unique: true }, function (err, result) {
        if (err) throw err
        res.json(person);
      })
    }
  });

  // Update a member
  router.put('/draw/:id', function (req, res, next) {
    var member_id = require('mongodb').ObjectID(req.params.id)
    var person = req.body;
    if (!person){
      res.status(400);
      res.json({
        "error": "Bad Data"
      })
    } else {
      // var member_id = require('mongodb').ObjectID(person.id)
      db.collection('drawtable').updateOne(
        {_id: member_id}, 
        { $set : {isMatched: person.isMatched, santa: person.santa} }, 
        {}, 
        function (err, result) {
          if (err) throw err
          res.json(result);
        }
      )
    }
  });  

  // Delete a member
  router.delete('/draw/:id', function (req, res, next) {
    var member_id = require('mongodb').ObjectID(req.params.id)
    db.collection('drawtable').remove({_id: member_id}, function (err, result) {
      if (err) throw err
      res.json(result);
    })
  });
})

module.exports = router;