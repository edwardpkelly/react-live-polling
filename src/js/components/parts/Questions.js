import React from 'react';
import PropTypes from 'prop-types';

import SpeakerEvents from '../../../js/constants/speaker-events';

const Questions = props => {
    const { questions, emit } = props;

    return (
        <div id='questions' className='row'>
            <h2>Questions</h2>
            {questions.map((question, index) => {
                return (
                    <div key={index} className='col-xs-12 col-sm-6 col-md-3'>
                        <span onClick={() => emit(SpeakerEvents.ASK_QUESTION_EVENT, question)}>
                            {question.q}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

Questions.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    emit: PropTypes.func.isRequired
};

export default Questions;
