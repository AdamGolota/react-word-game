const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoURI = require('./config/keys').mongoURI;
const words = require('./routes/api/words');


mongoose.connect(mongoURI, { useNewUrlParser: true }).catch(console.log);

const app = express();

const port = 5000;

app.use(bodyParser.json());
app.use('/api/words', words);

app.listen(port, () => `Server running on port ${port}`);