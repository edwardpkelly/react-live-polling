import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppEvents from '../../../js/constants/app-events';
import AppConstants from '../../../js/constants/app-constants';

import Display from '../parts/Display';
import Join from '../parts/Join';
import Ask from '../parts/Ask';

class Audience extends Component {
    state = {
        formDataMember: '',
        formDataSpeaker: '',
        formDataTitle: ''
    };

    handleUpdateMember = value => {
        this.setState({
            formDataMember: value
        });
    };

    handleJoin = () => {
        const { emit } = this.props;
        emit(AppEvents.JOIN_NEW_MEMBER_EVENT, { name: this.state.formDataMember });
    };

    handleUpdateTitle = value => {
        this.setState({
            formDataTitle: value
        });
    };

    handleUpdateSpeaker = value => {
        this.setState({
            formDataSpeaker: value
        });
    };

    handleStart = () => {
        const { emit } = this.props;
        emit(AppEvents.START_PRESENTATION_EVENT, {
            name: this.state.formDataSpeaker,
            title: this.state.formDataTitle
        });
    };

    render() {
        const { audience, emit, currentQuestion, member, status } = this.props;
        const { name } = member;
        const hasQuestion = currentQuestion.hasOwnProperty('q');

        return (
            <div>
                <Display show={status === AppConstants.CONNECTED}>
                    <Display show={name}>
                        <Display show={!hasQuestion}>
                            <h2>Welcome {name}</h2>
                            <p>{audience.length} members connected.</p>
                            <p>Questions will appear here.</p>
                        </Display>

                        <Display show={hasQuestion}>
                            <Ask question={currentQuestion} emit={emit} />
                        </Display>
                    </Display>

                    <Display show={!name}>
                        <h1>Join the session.</h1>
                        <Join
                            handleUpdateMember={this.handleUpdateMember}
                            handleJoin={this.handleJoin}
                        />
                    </Display>
                </Display>
            </div>
        );
    }
}

Audience.propTypes = {
    audience: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentQuestion: PropTypes.object.isRequired,
    emit: PropTypes.func.isRequired,
    member: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired
};

export default Audience;
