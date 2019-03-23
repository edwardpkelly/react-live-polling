import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserEvents from '../../../js/constants/user-events';

import Display from './Display';

class Ask extends Component {
    state = {
        choices: [],
        answer: undefined
    };

    componentWillMount() {
        this.setupChoices();
    }

    componentWillReceiveProps() {
        this.setupChoices();
    }

    setupChoices = () => {
        const { question } = this.props;
        let keys = Object.keys(question);
        keys.shift();
        this.setState({
            choices: keys,
            answer: sessionStorage.answer
        });
    };

    selectAnswer = choice => {
        console.log(`Choice: ${choice}`);
        const { emit, question } = this.props;

        this.setState({
            answer: choice
        });
        sessionStorage.answer = choice;
        emit(UserEvents.ANSWER_QUESTION_EVENT, {
            question,
            choice
        });
    };

    addChoiceButton = (option, index, question) => {
        let types = ['primary', 'success', 'warning', 'danger', 'info'];
        return (
            <button
                key={index}
                className={`col-xs-12 col-sm-6 btn btn-${types[index]}`}
                onClick={() => this.selectAnswer(option)}
            >
                {option}: {question[option]}
            </button>
        );
    };

    render() {
        const { question } = this.props;
        const { q } = question;
        const { answer } = this.state;

        return (
            <div id='currentQuestion'>
                <Display show={answer}>
                    <h3>You answered: {answer}</h3>
                    <p>{question[answer]}</p>
                </Display>

                <Display show={!answer}>
                    <h2>{q}</h2>
                    <div className='row'>
                        {this.state.choices.map((option, index) =>
                            this.addChoiceButton(option, index, question)
                        )}
                    </div>
                </Display>
            </div>
        );
    }
}

Ask.propTypes = {
    question: PropTypes.object.isRequired
};

export default Ask;
