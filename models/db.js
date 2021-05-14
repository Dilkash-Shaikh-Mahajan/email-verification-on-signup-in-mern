const mongoose = require('mongoose');

module.exports = () => {
	mongoose
		.connect('mongodb://localhost:27017/sendMail', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: true,
		})
		.then(console.log('DataBase Conncetion Successfull...'));
};
