import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import socketio from 'socket.io-client';

import AppConstants from './constants/app-constants'
import ConnectionEvents from './constants/socket-events';
import AppEvents from './constants/app-events';
import SpeakerEvents from './constants/speaker-events';
import UserConstants from './constants/user-constants';
import Header from './components/parts/Header';
import Audience from './components/container/Audience';
import Speaker from './components/container/Speaker';
import Board from './components/container/Board';
import Error404 from './components/Error404';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: AppConstants.DISCONNECTED,
            title: '',
            member: {},
            audience: [],
            speaker: '',
            questions: [],
            currentQuestion: {},
            results: {}
        };
    }

    componentWillMount() {
        this.socket = socketio.connect(`${AppConstants.APP_URL}:${AppConstants.APP_PORT}`);
        this.socket.on(ConnectionEvents.SOCKET_CONNECT, this.connect);
        this.socket.on(ConnectionEvents.SOCKET_DISCONNECT, this.disconnect);
        this.socket.on(AppEvents.WELCOME_EVENT, this.updateState);
        this.socket.on(AppEvents.JOINED_PRESENTATION_EVENT, this.joined);
        this.socket.on(AppEvents.AUDIENCE_UPDATED_EVENT, this.updateAudience);
        this.socket.on(AppEvents.START_PRESENTATION_EVENT, this.start);
        this.socket.on(AppEvents.END_PRESENTATION_EVENT, this.updateState);
        this.socket.on(SpeakerEvents.ASK_QUESTION_EVENT, this.onAskQuestion);
        this.socket.on(AppEvents.RESULTS_UPDATED_EVENT, this.updateResults);
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
            if (type === UserConstants.AUDIENCE) {
                this.emit(AppEvents.JOIN_NEW_MEMBER_EVENT, member);
            } else if (type === UserConstants.SPEAKER) {
                this.emit(AppEvents.START_PRESENTATION_EVENT, { name, title: sessionStorage.title });
            }
        }

        this.setState({
            status: AppConstants.CONNECTED
        });
    };

    disconnect = () => {
        const status = AppConstants.DISCONNECTED;
        this.setState({
            status,
            title: status,
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
        if (this.state.member.type === UserConstants.SPEAKER) {
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

    updateResults = data => {
        this.setState({
            results: data
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
