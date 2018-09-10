import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ListGroup, ListGroupItem} from 'reactstrap';
class History extends Component {

    render(){
        return (
            <div>
                <ListGroup>
                    {this.props.words.map((word) => {
                        return (
                        <ListGroupItem className = "text-center" key={word._id}>
                            {word.value}
                        </ListGroupItem>  
                        );
                    })}
                </ListGroup>
            </div>
        );
    }
}

export default History;