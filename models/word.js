const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    value: String
});

module.exports = Word = mongoose.model('word', WordSchema);