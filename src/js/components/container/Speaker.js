import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppEvents from '../../../js/constants/app-events';
import AppConstants from '../../../js/constants/app-constants';
import UserConstants from '../../../js/constants/user-constants';

import Display from '../parts/Display';
import JoinSpeaker from '../parts//JoinSpeaker';
import Attendance from '../parts/Attendance';
import Questions from '../parts/Questions';

class Speaker extends Component {
    state = {
        formDataSpeaker: '',
        formDataTitle: ''
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
        const {
            audience,
            emit,
            status,
            member,
            questions
        } = this.props;
        const {
            name,
            type
        } = member;

        return (
            <div>
                <Display show={status === AppConstants.CONNECTED}>
                    <Display
                        show={
                            name &&
                            type === UserConstants.SPEAKER
                        }
                    >
                        <Questions questions={questions} emit={emit} />
                        <Attendance audience={audience} />
                    </Display>

                    <Display show={!name}>
                        <h2>Start the presentation...</h2>
                        <JoinSpeaker
                            handleUpdateSpeaker={this.handleUpdateSpeaker}
                            handleUpdateTitle={this.handleUpdateTitle}
                            handleStart={this.handleStart}
                        />
                    </Display>
                </Display>
            </div>
        );
    }
}

Speaker.propTypes = {
    audience: PropTypes.arrayOf(PropTypes.object).isRequired,
    emit: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    member: PropTypes.object.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Speaker;
