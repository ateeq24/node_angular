const mongoose = require('mongoose');

const userSchema = mongoose.Schema( {
	fullname: String,
	age: Number,
	salary: Number,
	address: String
});

module.exports = mongoose.model('User', userSchema);
