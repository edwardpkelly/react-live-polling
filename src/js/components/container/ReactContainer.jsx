import React, { Component } from 'react';
import socketio from 'socket.io-client';

class ReactContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { };

        this.handleChange = this.handleChange.bind(this);
        this.connect = this.connect.bind(this);
    }

    componentWillMount() {
        this.socket = socketio.connect('http://localhost:3000');
        this.socket.on('connect', this.connect);
    }

    connect() {
        alert(`Connected: ${this.socket.id}`);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() { 
        return ( 
            <h2>Base React Component!!</h2>

         );
    }
}
 
export default ReactContainer;