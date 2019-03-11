import React, { Component } from 'react';

import Display from '../parts/Display';
import JoinSpeaker from '../parts//JoinSpeaker';
import Attendance from '../parts/Attendance';

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
        this.props.emit('start', {
            name: this.state.formDataSpeaker,
            title: this.state.formDataTitle
        });
    };

    render() {
        return (
            <div>
                <Display show={this.props.status === 'connected'}>
                    <Display
                        show={
                            this.props.member.name &&
                            this.props.member.type === 'speaker'
                        }
                    >
                        <p>Questions</p>
                        <Attendance audience={this.props.audience} />
                    </Display>

                    <Display show={!this.props.member.name}>
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

export default Speaker;
