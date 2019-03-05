import React, { Component } from 'react';

class Audience extends Component {
    state = {  };
    render() { 
        console.log(this.props);
        return ( 
        <h1>
            Audience: {this.props.title}
        </h1> );
    }
}
 
export default Audience;