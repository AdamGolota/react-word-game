const express = require('express');
const router = express.Router();

const Word = require('../../models/word');

// @route   GET api/words
// @desc    Get all words
// @access  Public
router.get('/', (req, res) => {
    Word.find()
        .then(words => res.json(words))
        .catch(console.log);
});

// @route   POST api/words
// @desc    Add new word to history
// @access  Public
router.post('/', (req, res) => {
    const NewWord = new Word({
        value: req.body.value
    });
    NewWord.save()
        .then(word => res.json(word));
});

module.exports = router;