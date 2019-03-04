import React, { Component } from 'react';
import socketio from 'socket.io-client';

import Header from '../parts/Header';

class ReactContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'disconnected'
        };
    }

    componentWillMount() {
        this.socket = socketio.connect('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
    }

    connect = () => {
        alert(`Connected: ${this.socket.id}`);
        this.setState({
            status: 'connected'
        });
    }

    disconnect = () => {
        this.setState({
            status: 'disconnected'
        });
    }

    render() { 
        return ( 
            <div>
                <Header title="New Header" status={this.state.status} />
            </div>
         );
    }
}
 
export default ReactContainer;