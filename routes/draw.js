var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://meng:meng@ds021751.mlab.com:21751/drawlist', function (err, db) {
  if (err) throw err

  // Get all members
  router.get('/draw', function (req, res, next) {
    db.collection('drawtable').find().toArray(function (err, result) {
      if (err) throw err

      res.json(result);
    })
  });

  // Get one member
  router.get('/draw/:id', function (req, res, next) {
    var member_id = require('mongodb').ObjectID(req.params.id)
    db.collection('drawtable').findOne({_id: member_id}, function (err, result) {
      if (err) throw err

      res.json(result);
    })
  });

  // Add a member
  router.post('/draw', function (req, res, next) {
    var person = req.body;
    console.log(person)
    if(!person.name){
      res.status(400);
      res.json({
        'error': 'Bad Data'
      })
    } else {
      db.collection('drawtable').save(person, function (err, result) {
        if (err) throw err

        res.json(result);
      })
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

  // Update a member
  router.put('/draw/:id', function (req, res, next) {
    var person = req.body;
    var updPerson = {};
    if (person.isMatched){
      updPerson.isMatched = person.isMatched
    }
    if (!updPerson){
      res.status(400);
      res.json({
        "error": "Bad Data"
      })
    } else {
      var member_id = require('mongodb').ObjectID(req.params.id)
      db.collection('drawtable').delete({_id: member_id}, updPerson, {}, function (err, result) {
        if (err) throw err
        res.json(result);
      })
    }
    });  
})

module.exports = router;