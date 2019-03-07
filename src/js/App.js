import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import socketio from 'socket.io-client';

import Header from './components/parts/Header';
import Audience from './components/container/Audience';
import Speaker from './components/container/Speaker';
import Board from './components/container/Board';
import Error404 from './components/Error404';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'disconnected',
            title: '',
            member: {},
            audience: []
        };
    }

    componentWillMount() {
        this.socket = socketio.connect('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.welcome);
        this.socket.on('joined', this.joined);
        this.socket.on('audience', this.updateAudience);
    }

    emit = (eventType, data) => {
        this.socket.emit(eventType, data);
    }

    connect = () => {
        const member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
        if (member) this.emit('join', member);
        
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
        });
    }

    joined = (data) => {
        sessionStorage.member = JSON.stringify(data);
        this.setState({
            member: data
        });
    }

    updateAudience = (newAudience) => {
        this.setState({
            audience: newAudience
        });
    }

    render() { 
        return ( 
            <div>
                <Header title={this.state.title} status={this.state.status} />
                <Switch>
                    <Route path="/" exact render={props => <Audience {...props} {...this.state} emit={this.emit} /> } />
                    <Route path="/speaker" render={props => <Speaker {...props} {...this.state} /> } />
                    <Route path="/board" render={props => <Board {...props} {...this.state} /> } />
                    <Route component={Error404} />
                </Switch>
            </div>
         );
    }
}
 
export default App;