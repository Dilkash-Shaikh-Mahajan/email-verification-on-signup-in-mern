const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	fname: {
		type: String,
	},
	lname: String,
	email: String,
	emailToken: String,
	isVerified: Boolean,
	password: String,
});
module.exports = mongoose.model('user', userSchema);
