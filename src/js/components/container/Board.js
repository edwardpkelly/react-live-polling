import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Display from '../parts/Display';

class Board extends Component {
    render() {
        const { currentQuestion, results, status } = this.props;
        const { q } = currentQuestion;

        const isEmpty = !Object.keys(results).length > 0;

        return (
            <div id='scorebaord'>
                <Display show={status === 'connected' && q}>
                    <h3>{q}</h3>
                    <Display show={!isEmpty}>
                        <p>{JSON.stringify(results)}</p>
                    </Display>
                    <Display show={isEmpty}>
                        <p>Awaiting responses...</p>
                    </Display>
                </Display>

                <Display show={status === 'connected' && !q}>
                    <h3>Awaiting the next question...</h3>
                </Display>
            </div>
        );
    }
}

Board.propTypes = {
    currentQuestion: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired
};

export default Board;
