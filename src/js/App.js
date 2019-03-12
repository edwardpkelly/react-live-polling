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
            audience: [],
            speaker: '',
            questions: [],
            currentQuestion: {}
        };
    }

    componentWillMount() {
        this.socket = socketio.connect('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.updateState);
        this.socket.on('joined', this.joined);
        this.socket.on('audience', this.updateAudience);
        this.socket.on('start', this.start);
        this.socket.on('end', this.updateState);
        this.socket.on('ask', this.onAskQuestion);
    }

    emit = (eventType, data) => {
        this.socket.emit(eventType, data);
    };

    connect = () => {
        const member = sessionStorage.member
            ? JSON.parse(sessionStorage.member)
            : null;

        if (member) {
            const { type, name } = member;
            if (type === 'audience') {
                this.emit('join', member);
            } else if (type === 'speaker') {
                this.emit('start', { name, title: sessionStorage.title });
            }
        }

        this.setState({
            status: 'connected'
        });
    };

    disconnect = () => {
        this.setState({
            status: 'disconnected',
            title: 'disconnected',
            speaker: ''
        });
    };

    updateState = serverState => {
        this.setState({
            ...serverState
        });
    };

    joined = data => {
        sessionStorage.member = JSON.stringify(data);
        this.setState({
            member: data
        });
    };

    updateAudience = newAudience => {
        this.setState({
            audience: newAudience
        });
    };

    start = presentation => {
        if (this.state.member.type === 'speaker') {
            const { title } = presentation;
            sessionStorage.title = title;
        }
        this.setState({ ...presentation });
    };

    onAskQuestion = question => {
        sessionStorage.answer = '';
        this.setState({
            currentQuestion: question
        });
    };

    render() {
        return (
            <div>
                <Header {...this.state} />
                <Switch>
                    <Route
                        path='/'
                        exact
                        render={props => (
                            <Audience
                                {...props}
                                {...this.state}
                                emit={this.emit}
                            />
                        )}
                    />
                    <Route
                        path='/speaker'
                        render={props => (
                            <Speaker
                                {...props}
                                {...this.state}
                                emit={this.emit}
                            />
                        )}
                    />
                    <Route
                        path='/board'
                        render={props => <Board {...props} {...this.state} />}
                    />
                    <Route component={Error404} />
                </Switch>
            </div>
        );
    }
}

export default App;
