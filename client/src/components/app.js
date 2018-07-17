import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comparison from './comparison'
import WordInput from './input'
import History from './history'
import axios from 'axios';


class App extends Component {
    state = {
        lastWord: "",
        newWord:  "",
        wordState: "empty",
        wordsHistory: []
        // Possible word states are:
        // empty — word is to be typed in
        // valid — word is legal by all rules
        // repeated — word was sent before
        // invalid — the first character doesn't match
        // nonexistent — word can't be found in a dictionary
    }
    
    componentDidMount(){
        this.loadWords()
            .then(() => this.setState({
                lastWord: this.state.wordsHistory[0].value
            }))
            .catch(console.log);   
    }

    handleWordChange = word => {
        if(!isLiteral(word) && word) {
            return;
        }

        this.setState({newWord: word})

        if (!word){
            this.setState({
                wordState: "empty"
            });
            return;
        }

        let firstLetter = word.charAt(0).toLowerCase();
        this.setState({wordState: this.checkValid(firstLetter) ? "valid" : "invalid"})
    }

    handleWordSubmit = (word) => {
        axios.post('/api/words', {value: word})
            .then(response => this.setState(state => state.wordsHistory.push(response.data)))
            .catch(console.log);
    }

    handleGetWords = () => {
        this.loadWords();
    }

    loadWords = () => {
        return axios.get('/api/words')
            .then(response => response.data )
            .then(words => this.setState({
                wordsHistory: this.state.wordsHistory.concat(words)
            }))
            .catch(console.log);
    }

    
    checkValid = firstLetter => firstLetter === this.state.lastWord.slice(-1).toLowerCase();

    render(){
        return (
            <div>
                <Comparison 
                    wordState={this.state.wordState} 
                    newWord={this.state.newWord} 
                    lastWord={this.state.lastWord}/>
                <WordInput 
                    onWordChange={this.handleWordChange}
                    onWordSubmit={this.handleWordSubmit}
                    value = {this.state.newWord}/>
                <History  
                    words={this.state.wordsHistory}
                    onGetWords={this.handleGetWords}/>
            </div>
        );
    }
}

function isLiteral(str) {
    return !str.match(/[^a-z]/i);
}

export default App;