const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    value: String,
    date: {type:  Date, default: Date.now}
});

module.exports = Word = mongoose.model('word', WordSchema);