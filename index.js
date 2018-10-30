const Joi = require('joi');
const User = require('./models/user');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/users', function(err) {
  if (err) return;
});

app.get('/', (req, res) => {
	res.send('Welcome to Users API');
})

app.get("/api/users/", (req, res) => {
  User.find()
    .exec()
    .then(docs => {
      console.log(docs);
        if (docs.length >= 0) {
      		res.status(200).json(docs);
        } else {
            res.status(404).json({ message: 'No entries found' });
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.get('/api/users/filterByAge', (req, res) => {
	
	//res.status(200).send(req.query);
	const operator = "$"+req.query.operator;
	let query = { "age": { } }
	query["age"][operator] = req.query.age;
	const user = User.find(query).sort({age: req.query.sort}).exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: `No record found for ${id}` });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
app.get('/api/users/:uid', (req, res) => {
	const user = User.findById(req.params.uid).exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: `No record found for ${id}` });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

app.post('/api/users', (req, res) => {
	
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	
	const user = new User ({
		fullname: req.body.fullname,
		age: req.body.age,
		salary: req.body.salary,
		address: req.body.address
	});
	user.save().then(result => {
		console.log(result);
		res.send(user);
	}).catch(err => {
		res.status(500).send(err);
	});	
});

app.put('/api/users/:_id', (req, res) => {

	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//Check for updated values
	var updateOps = {};
	if(req.body.fullname)
		updateOps['fullname'] = req.body.fullname;
	if(req.body.age)
		updateOps['age'] = req.body.age;
	if(req.body.salary)
		updateOps['salary'] = req.body.salary;
	if(req.body.address)
		updateOps['address'] = req.body.address;

	//Set the updated values
	User.update({ _id: req.params._id }, { $set: updateOps }).exec().then(result => {
		console.log(result);
		res.status(200).json(result);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: err});
	});
});

app.delete('/api/users/:_id', (req, res) => {

	User.remove({ _id: req.params._id }).exec().then(result => {
		console.log(result);
		res.status(200).json(result);
	}).catch(err => {
		console.log(err);
		res.status(500).json({ error: err});
	});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

function validateUser(user) {
	const schema = {
		fullname: Joi.string(),
		age: Joi.number(),
		salary: Joi.number(),
		address: Joi.string(),
	};
	return Joi.validate(user, schema);
}