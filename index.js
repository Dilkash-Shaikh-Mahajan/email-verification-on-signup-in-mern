const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const db = require('./models/db');
db();
app.use(cors());
app.use(bodyparser.json());
app.use('/api', routes);

app.get('/', (req, res) => {
	res.json('Hi, I am Dilkash');
});
app.listen(3001, () => {
	console.log(`Server started on 3001`);
});
