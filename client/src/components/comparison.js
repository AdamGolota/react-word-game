import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'reactstrap';
import consts from '../config/consts';

const maxLen = consts.maxWordLen;
const newWordPlaceholder = "(...)";
const lastWordPlaceholder = "(start)";
const maxFontSize = 42;

class Comparison extends Component {

    componentDidUpdate() {
        let lastWordBox = document.getElementById("lastWord").children[0];
        let newWordBox = document.getElementById("newWord").children[0];
        this.fontAutoScale(lastWordBox, this.props.lastWord);
        this.fontAutoScale(newWordBox, this.props.newWord);
    }

    lastLetterColorClass = () => {
        if (this.props.lastWord)
        switch(this.props.wordState){
            case "valid": 
                return "text-success";
            case "invalid": 
                return "text-danger";
            default:
                return "";
        }
    }

    get newWord() {
        switch(this.props.wordState){
            case "empty":
                return newWordPlaceholder;
            default:    
                return this.props.newWord;
        }
    }

    fontAutoScale(element, text){
        let fontSize;
        if (text.length > 0.75 * maxLen)
            fontSize = maxFontSize / 3.5;
        else if (text.length > 0.5 * maxLen)
            fontSize = maxFontSize / 2.85; 
        else if (text.length > 0.25 * maxLen)
            fontSize = maxFontSize / 1.75;
        else
            fontSize = maxFontSize;
        element.style.fontSize = `${fontSize}px`;

    }

    get lastWord(){
        if(!this.props.lastWord)
            return lastWordPlaceholder;
        return this.props.lastWord;
    }

    render(){
        return (
            <pre>
                <Container>
                    <Row className=" align-items-center">
                        <Col id="lastWord" xs="12" md="5" className="text-center text-md-left">
                            <h2 className = 'align-middle'>{this.lastWord.slice(0,-1)} 
                                <span className={this.lastLetterColorClass()}>
                                    {this.lastWord.slice(-1)}
                                </span>
                            </h2>
                        </Col>
                        <Col md="2" className="d-none d-md-block text-center">
                            <h1 className = 'align-middle'> —> </h1>
                        </Col>
                        <Col id="newWord" xs="12" md="5" className="text-center text-md-right">
                            <h2> 
                                <span className={this.lastLetterColorClass()}>
                                    {this.newWord.slice(0,1)}
                                </span>
                                {this.newWord.slice(1)} 
                            </h2>
                        </Col>
                    </Row>
                </Container>
            </pre>
        );
    }
}

export default Comparison;