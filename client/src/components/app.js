import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'reactstrap';
import Comparison from './comparison'
import WordInput from './input'
import History from './history'
import axios from 'axios';
import consts from '../config/consts';

const maxLen = consts.maxWordLen;

const messages = {
    input: "Enter your word.",
    placeholder: " ",
    wrongInput: "Sorry, you must use english alphabet characters only.",
    tooLong: `Sorry, you can enter no more than ${maxLen} characters.`,
    repeated:"Sorry, this word has already been used.",
    invalid: "Sorry, but first and last letters don't match here.",
    nonexistent: "Sorry, we don't think this is a valid word.",
}

class App extends Component {
    state = {
        message: messages.input,
        newWord:  "",
        wordsHistory: []
    }
    
    componentDidMount(){
        this
            .loadWords()
            .then(this.connect)
            .catch(console.log); 
    }

    handleWordChange = word => {
        if(!isLiteral(word) && word) {
            this.msg = messages.wrongInput;
            return;
        }
        if(word.length > maxLen){
            this.msg = messages.tooLong;
            return;
        }
        this.setState({newWord: word}, () => {
            switch(this.wordState) {
                case 'empty':
                    this.msg = messages.input;
                    break;
                case 'invalid':
                    this.msg = messages.invalid;
                    break;
                default:
                    this.msg = messages.placeholder;
            }
        });
    }

   handleWordSubmit = (word) => {
        axios.post('/api/words', {value: word})
            .then(response => {
                
                if(response.data.repeat){
                    this.setState({message: messages.repeated});
                    console.log("Word repeat detected");
                }
                else if (response.data.nonexistent){
                    this.setState({message: messages.nonexistent});
                    console.log("Word not found!")
                }
            })
            .catch(console.log);
        this.newWord = "";
        this.msg = messages.input;
        console.log("Word submited on client side")
    }

    loadWords = () => {
        return axios.get('/api/words')
            .then(response => {
                console.log("Words loaded!");
                this.setState({
                    wordsHistory: this.state.wordsHistory.concat(response.data)
                });
            })
            .catch(console.log);
    }

    connect = () => {
        return axios
            .get('/api/words/connect')
            .then((response) => {
                console.log(this.state.wordsHistory);
                console.log(`word received ${response.data}`);
                this.addWord(response);
            })
            .then(this.connect)
            .catch((err) => {
                console.log(err);
                this.connect();
            });
    }

    addWord(response){
        this.setState(state => state.wordsHistory.unshift(response.data))
    }
    set msg(str) {
        this.setState({message: str});
    }

    set newWord(word) {
        this.setState({newWord: word});
    }

    get lastWord() {
        let lastElement = this.state.wordsHistory[0];
        if (!lastElement){
            return "";
        }
        return lastElement.value;
    }

    // Possible word states are:
        // empty — word is to be typed in
        // valid — word is legal by all rules
        // repeated — word was sent before
        // invalid — the first character doesn't match
        // nonexistent — word can't be found in a dictionary
    get wordState() {
        
        let word = this.state.newWord;
         if (!word){
            return "empty";
        };
        return this.checkValid(word) ? "valid" : "invalid";
    }
    
    checkValid = word => 
        !this.lastWord || 
        this.lastWord.slice(-1).toLowerCase() === word.charAt(0).toLowerCase();

    render(){
        return (
            <Container className="mt-2">
                <Row className = "justify-content-center">
                    <Col xs = "12" sm = "10" md ="9"lg = "7">
                        <Comparison 
                        wordState={this.wordState}
                        newWord={this.state.newWord} 
                        lastWord={this.lastWord}/>
                    </Col>
                </Row>
                <Row className = "justify-content-center">
                    <Col xs = "12" sm = "10" md ="8" lg = "6">
                        <p style={{"whiteSpace": "pre-wrap"}}>{this.state.message}</p>
                        <WordInput 
                            onWordChange={this.handleWordChange}
                            onWordSubmit={this.handleWordSubmit}
                            wordState={this.wordState}
                            value = {this.state.newWord}/>
                    </Col>
                </Row>

                <Row className = "justify-content-center">
                    <Col xs = "12" sm = "10" md ="8" lg = "6">
                        <History  
                            words={this.state.wordsHistory}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

function isLiteral(str) {
    return !str.match(/[^a-z]/i);
}

export default App;