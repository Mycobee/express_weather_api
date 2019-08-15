var express = require('express');
var bcrypt = require('bcrypt');
var saltRounds = 10;
var router = express.Router();
var User = require('../../../models').User;
var TokenGenerator = require( 'token-generator' )({
        salt: 'your secret ingredient for this magic recipe',
        timestampMap: 'penqpelwfg', 
    });

router.post("/", function(req, res, next) {
	bcrypt.hash(req.body.password, saltRounds, function (err, hash) {	
		if (req.body.password !== req.body.password_confirmation) {
  	  res.setHeader("Content-Type", "application/json");
  	  res.status(500).send({ error: "passwords do not match" });
    }
		else {
  		User.create({
				email: req.body.email,
  		  password: hash,
				api_key: TokenGenerator.generate(),
  		}).then(user => {
  		  res.setHeader("Content-Type", "application/json");
  		  res.status(201).send(JSON.stringify({api_key: user.api_key}));
  		}).catch(error => {
  		  res.setHeader("Content-Type", "application/json");
  		  res.status(500).send({ error });
  		});
		}
	});
});

module.exports = router;
