import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, FormGroup, Form} from 'reactstrap';



class WordInput extends Component {

    handleChange = (e) => {
        this.props.onWordChange(e.target.value);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onWordSubmit(e.target.elements.word.value.toLowerCase());
    }

    get submitDisabled() {
        if (this.props.wordState === "valid")
            return false;
        return true;
    }

    render(){
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup >
                    <Input 
                        name="word" 
                        type="text" 
                        value = {this.props.value} 
                        onChange={this.handleChange}/>
                    <Input type="submit" 
                        disabled = {this.submitDisabled}/>
                </FormGroup>
            </Form>
        );
    }
}

export default WordInput;