import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Input, FormGroup, Form} from 'reactstrap';



class WordInput extends Component {

    handleChange = (e) => {
        this.props.onWordChange(e.target.value);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onWordSubmit(e.target.elements.word.value);
    }

    render(){
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup >
                        <Input name="word" type="text" value = {this.props.value} onChange={this.handleChange}/>
                        <Input type="submit"/>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}

export default WordInput;