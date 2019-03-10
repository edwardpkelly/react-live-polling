import React, { Component } from 'react';
import Display from '../parts/Display';
import Join from '../parts/Join';

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
        this.props.emit('join', { name: this.state.formDataMember });
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
        console.log(this.props);
        return (
            <div>
                <Display show={this.props.status === 'connected'}>
                    <Display show={this.props.member.name}>
                        <h2>Welcome {this.props.member.name}</h2>
                        <p>{this.props.audience.length} members connected.</p>
                        <p>Questions will appear here.</p>
                    </Display>

                    <Display show={!this.props.member.name}>
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

export default Audience;
