import React, { Component } from 'react';
import Display from '../parts/Display';
import Join from '../parts/Join';

class Audience extends Component {
    state = { 
        formValue: ''
     };

    handleUpdateName = (value) => {
        this.setState({
            formValue: value
        });
    }

    handleJoin = () => {
        this.props.emit('join', { name: this.state.formValue });
    }

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
                        <Join handleUpdateName={this.handleUpdateName} handleJoin={this.handleJoin} />
                    </Display>
                    
                </Display>
            </div>
        );
    }
}
 
export default Audience;