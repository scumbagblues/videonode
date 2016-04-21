var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');

router.get('/', function(req, res){
	var collection = db.get('myCollection');
	collection.find({}, function(err, myCollection){
		if (err) throw err;
		res.json(myCollection);
	});
});

router.post('/', function(req, res){
    var collection = db.get('myCollection');
    collection.insert({
        title: req.body.title,
        description: req.body.description
    }, function(err, myCollection){
        if (err) throw err;

        res.json(myCollection);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('myCollection');
    collection.findOne({ _id: req.params.id }, function(err, myCollection){
        if (err) throw err;

      	res.json(myCollection);
    });
});


router.put('/:id', function(req, res){
    var collection = db.get('myCollection');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        description: req.body.description
    }, function(err, myCollection){
        if (err) throw err;

        res.json(myCollection);
    });
});

router.delete('/:id', function(req, res){
    var collection = db.get('myCollection');
    collection.remove({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});


module.exports = router;