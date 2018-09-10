const express = require('express');
const router = express.Router();
const axios = require('axios');
const keys = require('../../config/keys')
const Word = require('../../models/word');
const https = require('https');

responses = [];

// @route   GET api/words
// @desc    Get all words
// @access  Public
router.get('/', (req, res) => {
    Word.find()
        .sort('-date')
        .then(words => res.json(words))
        .catch(console.log);
});

// @route   GET api/words/connect
// @desc    Subscribe to long polling
// @access  Public
router.get('/connect', (req, res) => {
    responses.push(res);
});

// @route   POST api/words
// @desc    Add new word to history
// @access  Public
router.post('/', (req, res) => {
    console.log("Word received on server");

    const word = req.body.value;
    
    checkIfInDatabase(word)
        .then((result) => {
            console.log(result);
            if (result === 'REPEAT'){
                res.json({repeat: true});
                console.log("Caught database repeat!");
                throw (Error("Word is already in database"));
            } 
            else if (result === 'OK')
                return findInDictionary(word);
        })
        .then((result) => {
            if (result === 404){
                console.log("Nonexistent detected!");
                res.json({nonexistent: true});
                throw (Error("Word doesn't exist"));
            }
            const NewWord = new Word({
                value: word
            });
            console.log("Word sent to database");
            return NewWord.save();;
        })
        .then( (word) => {
            let response;
            while (response = responses.pop()){
                response.json(word);
            }
        })
        .catch(console.log);
});


function checkIfInDatabase(word){
    const cb = (doc) =>{
        console.log("callback called")
        if(doc){
            console.log(`Repeat detected on "${word}"`);
            return 'REPEAT';
        }
        console.log("Returning a resolved promise form 'check'");
        return 'OK';
    };
    console.log("Finding word " + word);
    let query = Word.findOne({value: word}).then(cb);
    
    return query;
}

function findInDictionary(word){

    const url = keys.dictionaryURL + word + keys.dictionaryFilters;
    const options = {
        headers: {
            'app_id': 'dc3c01c4',
            'app_key': '87dc4ee6166a88ea20d869c1e729c728'
        }
    }
    console.log("Sending request to: " + url);
    return axios.get(url, options)
        .catch(error => {
            if (error.response.status === 404)
                return 404;
            else
                throw error;
        });
}

module.exports = router;