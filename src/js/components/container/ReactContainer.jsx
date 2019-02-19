import React, { Component } from 'react';

class ReactContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() { 
        return ( 
            <h2>Base React Component!!</h2>

         );
    }
}
 
export default ReactContainer;