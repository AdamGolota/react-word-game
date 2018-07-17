import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'reactstrap';

const placeholder = "(answer)";

class Comparison extends Component {

    lastLetterColorClass = () => {
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
                return placeholder;
            default:    
                return this.props.newWord;
        }
    }

    render(){
        return (
            <pre>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs="12" md="3" className="text-center">
                            <h2>{this.props.lastWord.slice(0,-1)} 
                                <span className={this.lastLetterColorClass()}>
                                    {this.props.lastWord.slice(-1)}
                                </span>
                            </h2>
                        </Col>
                        <Col md="3" className="d-none d-md-block text-center">
                            <h1> —> </h1>
                        </Col>
                        <Col xs="12" md="3" className="text-center">
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