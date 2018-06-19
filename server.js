const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipes';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const Recipe = require('./models/recipes');

const PORT = process.env.PORT || process.argv[2] || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const html = require('./controllers/html')
const api = require('./controllers/api')
html(app);
api(app)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));