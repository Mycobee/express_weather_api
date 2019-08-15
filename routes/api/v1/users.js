var express = require('express');
var bcrypt = require('bcrypt');
var saltRounds = 10;
var router = express.Router();
var User = require('../../../models').User;

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
  		}).then(user => {
  		  res.setHeader("Content-Type", "application/json");
  		  res.status(201).send(JSON.stringify(user.api_key));
  		}).catch(error => {
  		  res.setHeader("Content-Type", "application/json");
  		  res.status(500).send({ error });
  		});
		}
	});
});

module.exports = router;
