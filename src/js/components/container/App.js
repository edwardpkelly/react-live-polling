import React, { Component } from 'react';
import socketio from 'socket.io-client';

import Header from '../parts/Header';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'disconnected',
            title: ''
        };
    }

    componentWillMount() {
        this.socket = socketio.connect('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.welcome);
    }

    connect = () => {
        this.setState({
            status: 'connected'
        });
    }

    disconnect = () => {
        this.setState({
            status: 'disconnected'
        });
    }

    welcome = (serverState) => {
        this.setState({
            title: serverState.title
        })
    }

    render() { 
        return ( 
            <div>
                <Header title={this.state.title} status={this.state.status} />
            </div>
         );
    }
}
 
export default App;