import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class History extends Component {

    render(){
        return (
            <div>
                <ul>
                    {this.props.words.map((word) => {
                        return (
                        <li key={word._id}>
                            {word.value}
                        </li>  
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default History;